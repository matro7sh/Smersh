import { AbstractResource } from 'src/app/resources/AbstractResource';
import {
  ImpactsCreateComponent,
  ImpactsEditComponent,
  ImpactsListComponent,
} from 'src/app/components/impacts';

export class ImpactResource extends AbstractResource {
  protected basePath = 'impacts';
  protected type = 'IMPACT';
  protected create = ImpactsCreateComponent;
  protected edit = ImpactsEditComponent;
  protected list = ImpactsListComponent;
}
