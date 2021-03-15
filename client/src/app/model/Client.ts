import {
  AbstractModelAPI,
  AbstractModelApplication,
  AbstractSerializerApplication,
  ObjectFromAPIInterface,
} from 'src/app/model/abstract';

interface ClientFromAPIInterface extends ObjectFromAPIInterface {
  name: string;
  phone: string;
  firstName: string;
  lastName: string;
  mail: string;
}

export class ClientSerializerApplication extends AbstractSerializerApplication {
  protected model = ClientModelApplication;
}

export class ClientModelApplication extends AbstractModelApplication {
  name: string;
  phone: string;
  firstname: string;
  lastname: string;
  fullname: string;
  mail: string;

  constructor(props: ClientFromAPIInterface) {
    super(props);
    this.name = props.name;
    this.phone = props.phone;
    this.firstname = props.firstName;
    this.lastname = props.lastName;
    this.fullname = `${props.firstName} ${props.lastName}`;
    this.mail = props.mail;
  }
}

class ClientModelAPI extends AbstractModelAPI {
  name: string;
  phone: string;
  firstname: string;
  lastname: string;
  mail: string;

  constructor(props: ClientModelApplication) {
    super(props);
    this.name = props.name;
    this.phone = props.phone;
    this.firstname = props.firstname;
    this.lastname = props.lastname;
    this.mail = props.mail;
  }
}
