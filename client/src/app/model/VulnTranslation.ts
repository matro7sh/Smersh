import {
  TranslationFromAPIInterface,
  TranslationModelAPI,
  TranslationModelApplication,
} from 'src/app/model/Translation';

export interface VulnTranslationFromAPIInterface
  extends TranslationFromAPIInterface {
  name: string;
  remediation: string;
  description: string;
}

export class VulnTranslationModelApplication extends TranslationModelApplication {
  name: string;
  remediation: string;
  description: string;

  constructor(props: VulnTranslationFromAPIInterface) {
    super(props);
    this.name = props.name;
    this.remediation = props.remediation;
    this.description = props.description;
  }
}

class VulnTranslationModelAPI extends TranslationModelAPI {
  name: string;
  remediation: string;
  description: string;

  constructor(props: VulnTranslationModelApplication) {
    super(props);
    this.name = props.name;
    this.remediation = props.remediation;
    this.description = props.description;
  }
}
