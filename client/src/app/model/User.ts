import {
  AbstractModelAPI,
  AbstractModelApplication,
  AbstractSerializerApplication,
  ObjectFromAPIInterface,
} from 'src/app/model/abstract';

interface UserFromAPIInterface extends ObjectFromAPIInterface {
  username: string;
  enabled: boolean;
}

export class UserSerializerApplication extends AbstractSerializerApplication {
  protected model = UserModelApplication;
}

class UserModelApplication extends AbstractModelApplication {
  username: string;
  enabled: boolean;

  constructor(props: UserFromAPIInterface) {
    super(props);
    this.username = props.username;
    this.enabled = props.enabled;
  }
}

class UserModelAPI extends AbstractModelAPI {
  username: string;
  enabled: boolean;

  constructor(props: UserModelApplication) {
    super(props);
    this.username = props.username;
    this.enabled = props.enabled;
  }
}
