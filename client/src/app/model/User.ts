import {
  AbstractModelAPI,
  AbstractModelApplication,
  AbstractSerializerApplication,
  ObjectFromAPIInterface,
} from 'src/app/model/abstract';
import {
  MissionModelApplication,
  MissionSerializerApplication,
} from 'src/app/model/Mission';

interface UserFromAPIInterface extends ObjectFromAPIInterface {
  phone: string;
  trigram: string;
  mail: string;
  city: string;
  username: string;
  enabled: boolean;
  missions: any;
}

export class UserSerializerApplication extends AbstractSerializerApplication {
  protected model = UserModelApplication;
}

export class UserModelApplication extends AbstractModelApplication {
  phone: string;
  trigram: string;
  mail: string;
  city: string;
  username: string;
  enabled: boolean;
  missions: MissionModelApplication[];

  constructor(props: UserFromAPIInterface) {
    super(props);
    this.username = props.username;
    this.enabled = props.enabled;
    this.phone = props.phone;
    this.trigram = props.trigram;
    this.city = props.city;
    this.mail = props.mail;
    this.missions = new MissionSerializerApplication().serializeMany(
      props.missions
    ) as MissionModelApplication[];
  }
}

class UserModelAPI extends AbstractModelAPI {
  username: string;
  enabled: boolean;
  phone: string;
  trigram: string;
  mail: string;
  city: string;

  constructor(props: UserModelApplication) {
    super(props);
    this.username = props.username;
    this.enabled = props.enabled;
    this.phone = props.phone;
    this.trigram = props.trigram;
    this.city = props.city;
    this.mail = props.mail;
  }
}
