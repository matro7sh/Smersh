import {
  AbstractModelAPI,
  AbstractModelApplication,
  AbstractNormalizerApplication,
  AbstractSerializerApplication,
  ObjectFromAPIInterface,
} from 'src/app/model/abstract';
import {
  MissionModelApplication,
  MissionSerializerApplication,
} from 'src/app/model/Mission';

interface StepFromAPIInterface extends ObjectFromAPIInterface {
  createdAt: string;
  description: string;
  findAt: string;
}

export class StepSerializerApplication extends AbstractSerializerApplication {
  protected model = StepModelApplication;
}

export class StepNormalizerApplication extends AbstractNormalizerApplication {
  protected model = StepModelAPI;
}

export class StepModelApplication extends AbstractModelApplication {
  createdAt: string;
  description: string;
  findAt: string;

  constructor(props: StepFromAPIInterface) {
    super(props);
    this.createdAt = props.createdAt;
    this.description = props.description;
    this.findAt = props.findAt;
  }
}

class StepModelAPI extends AbstractModelAPI {
  createdAt: string;
  description: string;
  findAt: string;

  constructor(props: StepModelApplication) {
    super(props);
    this.createdAt = new Date().toISOString();
    this.description = props.description;
    this.findAt = props.findAt;
  }
}
