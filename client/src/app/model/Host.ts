import {
  AbstractModelAPI,
  AbstractModelApplication,
  AbstractNormalizerApplication,
  AbstractSerializerApplication,
  ObjectFromAPIInterface,
} from 'src/app/model/abstract';

export interface HostFromAPIInterface extends ObjectFromAPIInterface {
  name: string;
  hostVulns: string[];
  checked: boolean;
  mission: string;
  technology: string;
}

export class HostSerializerApplication extends AbstractSerializerApplication {
  protected model = HostModelApplication;
}

export class HostNormalizerApplication extends AbstractNormalizerApplication {
  protected model = HostModelAPI;
}

export class HostModelApplication extends AbstractModelApplication {
  name: string;
  hostVulns: any[];
  checked: boolean;
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
  technology: string;
  mission: string;
  checked: boolean;

  constructor(props: HostModelApplication) {
    super(props);
    this.name = props.name;
    this.technology = props.technology;
    this.mission = props.mission;
    this.checked = props.checked;
  }
}
