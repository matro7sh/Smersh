import {
  AbstractModelAPI,
  AbstractModelApplication,
  AbstractNormalizerApplication,
  AbstractSerializerApplication,
  ObjectFromAPIInterface,
} from 'src/app/model/abstract';

export interface AuthenticationFromAPIInterface extends ObjectFromAPIInterface {
  username?: string;
  password?: string;
  token?: string;
}

export class AuthenticationSerializerApplication extends AbstractSerializerApplication {
  protected model = AuthenticationModelApplication;
}

export class AuthenticationNormalizerApplication extends AbstractNormalizerApplication {
  protected model = AuthenticationModelAPI;
}

export class AuthenticationModelApplication extends AbstractModelApplication {
  username?: string;
  password?: string;
  token?: string;

  constructor(props: AuthenticationFromAPIInterface) {
    super({
      '@id': '',
      '@type': ''
    });
    this.username = props.username;
    this.password = props.password;
    this.token = props.token;
  }
}

class AuthenticationModelAPI extends AbstractModelAPI {
  username: string;
  password: string;

  constructor(props: AuthenticationModelApplication) {
    super(props);
    this.username = props.username;
    this.password = props.password;
  }
}
