import {
  AbstractModelAPI,
  AbstractModelApplication,
  AbstractNormalizerApplication,
  AbstractSerializerApplication,
  ObjectFromAPIInterface,
} from 'src/app/model/abstract';
import { VulnTranslationFromAPIInterface, VulnTranslationModelApplication, } from 'src/app/model/VulnTranslation';
import { getTranslation } from 'src/app/helpers/translation';

const ALLOWED_LANGUAGES = ['fr', 'en', 'ar', 'es', 'ru'];

export interface VulnFromAPIInterface extends ObjectFromAPIInterface {
  vulnType: string;
  impact: string;
  translations: {
    [key: string]: VulnTranslationFromAPIInterface;
  };
  hostVulns: string[];
  description: string;
  name: string;
  remediation: string;
}

export class VulnSerializerApplication extends AbstractSerializerApplication {
  protected model = VulnModelApplication;
}

export class VulnNormalizerApplication extends AbstractNormalizerApplication {
  protected model = VulnModelAPI;
}

export class VulnModelApplication extends AbstractModelApplication {
  description: string;
  hostVulns: string[];
  impact: string;
  name: string;
  translations: {
    [key: string]: VulnTranslationModelApplication;
  };
  remediation: string;
  type: string;

  constructor(props: VulnFromAPIInterface) {
    super(props);
    this.translations = ALLOWED_LANGUAGES.reduce((acc, language) => {
      if (props.translations[language.toString()]) {
        acc[language.toString()] = new VulnTranslationModelApplication(
          props.translations[language.toString()]
        );
      }

      return acc;
    }, {});
    const translation = getTranslation(
      this.translations
    ) as VulnTranslationFromAPIInterface;
    this.description = translation?.description;
    this.hostVulns = props.hostVulns;
    this.impact = props.impact;
    this.name = translation?.name;
    this.remediation = translation?.remediation;
    this.type = props.vulnType;
  }
}

class VulnModelAPI extends AbstractModelAPI {
  impact: string;
  translations: {
    [key: string]: VulnTranslationModelApplication;
  };
  vulnType: string;

  constructor(props: VulnModelApplication) {
    super(props);
    this.impact = props.impact;
    this.translations = props.translations;
    this.vulnType = props.type;
  }
}
