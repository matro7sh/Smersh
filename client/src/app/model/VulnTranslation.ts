import {
  TranslationFromAPIInterface,
  TranslationModelAPI,
  TranslationModelApplication,
} from 'src/app/model/Translation';
import { AbstractNormalizerApplication, AbstractSerializerApplication, } from 'src/app/model/abstract';

export interface VulnTranslationFromAPIInterface
  extends TranslationFromAPIInterface {
  name: string;
  remediation: string;
  description: string;
}

export class VulnTranslationSerializerApplication extends AbstractSerializerApplication {
  protected model = VulnTranslationModelApplication;
}

export class VulnTranslationNormalizerApplication extends AbstractNormalizerApplication {
  protected model = VulnTranslationModelAPI;
}

export class VulnTranslationModelApplication extends TranslationModelApplication {
  currentLocale: string;
  description: string;
  locale: string;
  name: string;
  remediation: string;
  translatable: string;

  constructor(props: VulnTranslationFromAPIInterface) {
    super(props);
    this.description = props.description;
    this.name = props.name;
    this.remediation = props.remediation;
  }
}

class VulnTranslationModelAPI extends TranslationModelAPI {
  currentLocale: string;
  description: string;
  locale: string;
  name: string;
  remediation: string;
  translatable: string;

  constructor(props: VulnTranslationModelApplication) {
    super(props);
    this.currentLocale = props.currentLocale;
    this.description = props.description;
    this.locale = props.locale;
    this.name = props.name;
    this.remediation = props.remediation;
    this.translatable = props.translatable;
  }
}
