import {
  AbstractModelAPI,
  AbstractModelApplication,
  AbstractSerializerApplication,
  ObjectFromAPIInterface,
} from 'src/app/model/abstract';

interface PointFromAPIInterface extends ObjectFromAPIInterface {
  name: string;
  description: string;
}

export class PointSerializerApplication extends AbstractSerializerApplication {
  protected model = PointModelApplication;
}

class PointModelApplication extends AbstractModelApplication {
  name: string;
  description: string;

  constructor(props: PointFromAPIInterface) {
    super(props);
    this.name = props.name;
    this.description = props.description;
  }
}

class PointModelAPI extends AbstractModelAPI {
  name: string;
  description: string;

  constructor(props: PointModelApplication) {
    super(props);
    this.name = props.name;
    this.description = props.description;
  }
}
