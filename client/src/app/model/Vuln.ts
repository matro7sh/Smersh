import {
  AbstractModelAPI,
  AbstractModelApplication,
  AbstractSerializerApplication,
  ObjectFromAPIInterface,
} from 'src/app/model/abstract';
import {
  VulnTranslationFromAPIInterface,
  VulnTranslationModelApplication,
} from 'src/app/model/VulnTranslation';

interface VulnFromAPIInterface extends ObjectFromAPIInterface {
  vulnType: string;
  impact: string;
  translations: {
    fr: VulnTranslationFromAPIInterface;
    en: VulnTranslationFromAPIInterface;
  };
  hostVulns: string[];
  description: string;
  name: string;
  remediation: string;
}

export class VulnSerializerApplication extends AbstractSerializerApplication {
  protected model = VulnModelApplication;
}

export class VulnModelApplication extends AbstractModelApplication {
  type: string;
  impact: string;
  translations: {
    fr: VulnTranslationModelApplication;
    en: VulnTranslationModelApplication;
  };
  hostVulns: string[];
  description: string;
  name: string;
  remediation: string;

  constructor(props: VulnFromAPIInterface) {
    super(props);
    this.translations = {
      fr: props.translations.fr
        ? new VulnTranslationModelApplication(props.translations.fr)
        : undefined,
      en: props.translations.en
        ? new VulnTranslationModelApplication(props.translations.en)
        : undefined,
    };
    this.type = props.vulnType;
    this.impact = props.impact;
    this.hostVulns = props.hostVulns;
    this.description = props.description;
    this.name = props.name;
    this.remediation = props.remediation;
  }
}

class VulnModelAPI extends AbstractModelAPI {
  vulnType: string;
  impact: string;
  translations: {
    fr: VulnTranslationModelApplication;
    en: VulnTranslationModelApplication;
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
