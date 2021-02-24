import {
  AbstractModelAPI,
  AbstractModelApplication,
  AbstractSerializerApplication,
  ObjectFromAPIInterface,
} from 'src/app/model/abstract';

interface MissionFromAPIInterface extends ObjectFromAPIInterface {
  name: string;
  startDate: string;
  pathToCodi: string;
  EndDate: string;
  users: string[];
  hosts: string[];
  nmap: boolean;
  nessus: boolean;
  nmapFiler: boolean;
  nessusFiler: boolean;
  missionType: string;
  credentials: string;
  clients: string[];
  steps: string[];
}

export class MissionSerializerApplication extends AbstractSerializerApplication {
  protected model = MissionModelApplication;
}

export class MissionModelApplication extends AbstractModelApplication {
  name: string;
  period: {
    start: Date;
    stop: Date;
  };
  pathToCodi: string;
  users: string[];
  hosts: string[];
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
      stop: new Date(props.EndDate),
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
    this.type = props.missionType;
    this.credentials = props.credentials;
    this.clients = props.clients;
    this.steps = props.steps;
  }
}

class MissionModelAPI extends AbstractModelAPI {
  name: string;
  startDate: string;
  pathToCodi: string;
  EndDate: string;
  users: string[];
  hosts: string[];
  nmap: boolean;
  nessus: boolean;
  nmapFiler: boolean;
  nessusFiler: boolean;
  missionType: string;
  credentials: string;
  clients: string[];
  steps: string[];

  constructor(props: MissionModelApplication) {
    super(props);
    this.name = props.name;
    this.startDate = props.period.start.toISOString();
    this.EndDate = props.period.stop.toISOString();
    this.pathToCodi = props.pathToCodi;
    this.users = props.users;
    this.hosts = props.hosts;
    this.nmap = props.nmap;
    this.nessus = props.nessus;
    this.nmapFiler = props.filer.nmap;
    this.nessusFiler = props.filer.nessus;
    this.missionType = props.type;
    this.credentials = props.credentials;
    this.clients = props.clients;
    this.steps = props.steps;
  }
}
