import {
  AbstractModelAPI,
  AbstractModelApplication,
  AbstractSerializerApplication,
  ObjectFromAPIInterface,
} from 'src/app/model/abstract';

export interface TranslationFromAPIInterface extends ObjectFromAPIInterface {
  locale: string;
}

export class TranslationSerializerApplication extends AbstractSerializerApplication {
  protected model = TranslationModelApplication;
}

export class TranslationModelApplication extends AbstractModelApplication {
  locale: string;

  constructor(props: TranslationFromAPIInterface) {
    super(props);
    this.locale = props.locale;
  }
}

export abstract class TranslationModelAPI extends AbstractModelAPI {
  locale: string;

  constructor(props: TranslationModelApplication) {
    super(props);
    this.locale = props.locale;
  }
}
