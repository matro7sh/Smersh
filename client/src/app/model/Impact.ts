import {
  AbstractModelAPI,
  AbstractModelApplication,
  AbstractNormalizerApplication,
  AbstractSerializerApplication,
  ObjectFromAPIInterface,
} from 'src/app/model/abstract';

export const LOW = 'Low';
export const MEDIUM = 'Medium';
export const HIGH = 'High';
export const CRITICAL = 'Critical';

interface ImpactFromAPIInterface extends ObjectFromAPIInterface {
  name: string;
}

export class ImpactSerializerApplication extends AbstractSerializerApplication {
  protected model = ImpactModelApplication;
}

export class ImpactNormalizerApplication extends AbstractNormalizerApplication {
  protected model = ImpactModelAPI;
}

export class ImpactModelApplication extends AbstractModelApplication {
  name: string;

  constructor(props: ImpactFromAPIInterface) {
    super(props);
    this.name = props.name;
  }
}

class ImpactModelAPI extends AbstractModelAPI {
  name: string;

  constructor(props: ImpactModelApplication) {
    super(props);
    this.name = props.name;
  }
}
