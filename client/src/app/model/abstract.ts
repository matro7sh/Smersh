export interface ObjectFromAPIInterface {
  '@id': string;
  '@type': string;
}

export class AbstractSerializerApplication {
  protected model = AbstractModelApplication;

  public serializeMany(
    items: ObjectFromAPIInterface[]
  ): AbstractModelApplication[] {
    return items.map((item) => new this.model(item));
  }

  public serialize(item: ObjectFromAPIInterface): AbstractModelApplication {
    return new this.model(item);
  }
}

export class AbstractModelApplication {
  public '@id': string;
  public '@type': string;
  public id: string;

  constructor(props: ObjectFromAPIInterface) {
    this['@id'] = props['@id'];
    this['@type'] = props['@type'];
    this.id = props['@id'].split('/').pop();
  }
}

export abstract class AbstractModelAPI {
  public '@id': string;

  constructor(props: AbstractModelApplication) {
    this['@id'] = props['@id'];
  }
}
