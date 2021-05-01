import {
  AbstractModelAPI,
  AbstractModelApplication,
  AbstractNormalizerApplication,
  AbstractSerializerApplication,
  ObjectFromAPIInterface,
} from 'src/app/model/abstract';
import {
  VulnTranslationFromAPIInterface,
  VulnTranslationModelApplication,
} from 'src/app/model/VulnTranslation';
import { Locale } from 'src/app/storage/Locale';

const ALLOWED_LANGUAGES = ['fr', 'en', 'ar', 'es', 'ru'];

interface VulnFromAPIInterface extends ObjectFromAPIInterface {
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
  type: string;
  impact: string;
  translations: {
    [key: string]: VulnTranslationModelApplication;
  };
  hostVulns: string[];
  description: string;
  name: string;
  remediation: string;

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
    const translation =
      this.translations[new Locale().get()] ??
      this.translations.en ??
      this.translations[Object.keys(this.translations)[0]];
    this.type = props.vulnType;
    this.impact = props.impact;
    this.hostVulns = props.hostVulns;
    this.description = translation.description;
    this.name = translation.name;
    this.remediation = translation.remediation;
  }
}

class VulnModelAPI extends AbstractModelAPI {
  vulnType: string;
  impact: string;
  translations: {
    [key: string]: VulnTranslationModelApplication;
  };
  hostVulns: string[];
  description: string;
  name: string;
  remediation: string;

  constructor(props: VulnModelApplication) {
    super(props);
    this.translations = props.translations;
    this.impact = props.impact;
    this.vulnType = props.type;
    this.hostVulns = props.hostVulns;
    this.description = props.description;
    this.name = props.name;
    this.remediation = props.remediation;
  }
}
