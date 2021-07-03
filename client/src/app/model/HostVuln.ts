import {
  AbstractModelAPI,
  AbstractModelApplication,
  AbstractNormalizerApplication,
  AbstractSerializerApplication,
  ObjectFromAPIInterface,
} from 'src/app/model/abstract';
import { VulnFromAPIInterface, VulnModelApplication } from 'src/app/model/Vuln';

interface HostVulnFromAPIInterface extends ObjectFromAPIInterface {
  host: {
    name: string;
  };
  vuln: VulnFromAPIInterface;
  impact: string;
  currentState: string;
}

export class HostVulnSerializerApplication extends AbstractSerializerApplication {
  protected model = HostVulnModelApplication;
}

export class HostVulnNormalizerApplication extends AbstractNormalizerApplication {
  protected model = HostVulnModelAPI;
}

export class HostVulnModelApplication extends AbstractModelApplication {
  currentState: string;
  host: {
    name: string;
  };
  impact: string;
  vuln: VulnModelApplication;
  image: string;

  constructor(props: HostVulnFromAPIInterface) {
    super(props);
    this.currentState = props.currentState;
    this.host = props.host;
    this.impact = props.impact;
    this.vuln = props.vuln ? new VulnModelApplication(props.vuln) : null;
  }
}

class HostVulnModelAPI extends AbstractModelAPI {
  currentState: string;
  host: string;
  impact: string;
  image: string;
  vuln: string;

  constructor(props: HostVulnModelApplication) {
    super(props);
    this.currentState = props.currentState;
    this.host = (props.host as unknown) as string;
    this.image = props.image;
    this.impact = props.impact;
    this.vuln = (props.vuln as unknown) as string;
  }
}
