import {
  AbstractModelAPI,
  AbstractModelApplication,
  AbstractNormalizerApplication,
  AbstractSerializerApplication,
  ObjectFromAPIInterface,
} from 'src/app/model/abstract';
import { HostFromAPIInterface } from 'src/app/model/Host';

interface MissionFromAPIInterface extends ObjectFromAPIInterface {
  name: string;
  startDate: string;
  pathToCodi: string;
  endDate: string;
  users: string[];
  hosts: (HostFromAPIInterface | string)[];
  nmap: boolean;
  nessus: boolean;
  nmapFiler: boolean;
  nessusFiler: boolean;
  missionType?: { name: string };
  credentials: string;
  clients: string[];
  steps: string[];
}

export class MissionSerializerApplication extends AbstractSerializerApplication {
  protected model = MissionModelApplication;
}

export class MissionNormalizerApplication extends AbstractNormalizerApplication {
  protected model = MissionModelAPI;
}

export class MissionModelApplication extends AbstractModelApplication {
  name: string;
  period: {
    start: Date;
    stop: Date;
  };
  pathToCodi: string;
  users: string[];
  hosts: (HostFromAPIInterface | string)[];
  nmap: boolean;
  nessus: boolean;
  filer: {
    nmap: boolean;
    nessus: boolean;
  };
  type: string;
  credentials: string;
  clients: string[];
  steps: string[];

  constructor(props: MissionFromAPIInterface) {
    super(props);
    this.name = props.name;
    this.period = {
      start: new Date(props.startDate),
      stop: new Date(props.endDate),
    };
    this.pathToCodi = props.pathToCodi;
    this.users = props.users;
    this.hosts = props.hosts;
    this.nmap = props.nmap;
    this.nessus = props.nessus;
    this.filer = {
      nmap: props.nmapFiler,
      nessus: props.nessusFiler,
    };
    this.type = props.missionType?.['@id'] ?? props.missionType;
    this.credentials = props.credentials;
    this.clients = props.clients;
    this.steps = props.steps;
  }
}

class MissionModelAPI extends AbstractModelAPI {
  name: string;
  users: string[];
  startDate: string;
  endDate: string;
  missionType: string;
  credentials: string;
  clients: string[];
  nmap: boolean;
  nessus: boolean;

  constructor(props: MissionModelApplication) {
    super(props);
    this.name = props.name;
    this.startDate = props.period?.start.toISOString();
    this.endDate = props.period?.stop.toISOString();
    this.users = props?.users;
    this.missionType = props?.type;
    this.credentials = props?.credentials;
    this.clients = props?.clients;
    this.nmap = props.nmap;
    this.nessus = props.nessus;
  }
}
