import {
  AbstractModelAPI,
  AbstractModelApplication,
  AbstractSerializerApplication,
  ObjectFromAPIInterface,
} from 'src/app/model/abstract';

export interface AbstractTypeFromAPIInterface extends ObjectFromAPIInterface {
  name: string;
}

export class AbstractTypeSerializerApplication extends AbstractSerializerApplication {
  protected model = AbstractTypeModelApplication;
}

export class AbstractTypeModelApplication extends AbstractModelApplication {
  name: string;

  constructor(props: AbstractTypeFromAPIInterface) {
    super(props);
    this.name = props.name;
  }
}

export class AbstractTypeModelAPI extends AbstractModelAPI {
  name: string;

  constructor(props: AbstractTypeModelApplication) {
    super(props);
    this.name = props.name;
  }
}
