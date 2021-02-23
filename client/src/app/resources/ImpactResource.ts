import { AbstractResource } from 'src/app/resources/AbstractResource';
import { ImpactsListComponent } from 'src/app/components/impact/impactsList.component';
import { ImpactEditComponent } from 'src/app/components/impact-edit/impact-edit.component';
import { ImpactCreateComponent } from 'src/app/components/impact-create/impact-create.component';

export class ImpactResource extends AbstractResource {
  protected basePath = 'impacts';
  protected list = ImpactsListComponent;
  protected edit = ImpactEditComponent;
  protected create = ImpactCreateComponent;
}
