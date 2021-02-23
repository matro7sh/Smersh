import {
  AbstractModelAPI,
  AbstractModelApplication,
  AbstractSerializerApplication,
  ObjectFromAPIInterface,
} from 'src/app/model/abstract';

interface HostFromAPIInterface extends ObjectFromAPIInterface {
  name: string;
  hostVulns: string[];
  mission: string;
  technology: string;
}

export class HostSerializerApplication extends AbstractSerializerApplication {
  protected model = HostModelApplication;
}

class HostModelApplication extends AbstractModelApplication {
  name: string;
  hostVulns: string[];
  mission: string;
  technology: string;

  constructor(props: HostFromAPIInterface) {
    super(props);
    this.name = props.name;
    this.hostVulns = props.hostVulns;
    this.mission = props.mission;
    this.technology = props.technology;
  }
}

class HostModelAPI extends AbstractModelAPI {
  name: string;
  hostVulns: string[];
  mission: string;
  technology: string;

  constructor(props: HostModelApplication) {
    super(props);
    this.name = props.name;
    this.hostVulns = props.hostVulns;
    this.mission = props.mission;
    this.technology = props.technology;
  }
}
