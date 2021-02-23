import {
  AbstractModelAPI,
  AbstractModelApplication,
  AbstractSerializerApplication,
  ObjectFromAPIInterface,
} from 'src/app/model/abstract';

interface ImpactFromAPIInterface extends ObjectFromAPIInterface {
  name: string;
}

export class ImpactSerializerApplication extends AbstractSerializerApplication {
  protected model = ImpactModelApplication;
}

class ImpactModelApplication extends AbstractModelApplication {
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
