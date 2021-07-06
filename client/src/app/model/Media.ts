import {
  AbstractModelAPI,
  AbstractModelApplication,
  AbstractSerializerApplication,
  ObjectFromAPIInterface,
} from 'src/app/model/abstract';

interface ClientFromAPIInterface extends ObjectFromAPIInterface {
  name: string;
}

export class ClientSerializerApplication extends AbstractSerializerApplication {
  protected model = ClientModelApplication;
}

export class ClientModelApplication extends AbstractModelApplication {
  name: string;

  constructor(props: ClientFromAPIInterface) {
    super(props);
    this.name = props.name;
  }
}
