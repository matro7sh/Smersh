import { AbstractResource } from 'src/app/resources/AbstractResource';
import {
  VulnsCreateComponent,
  VulnsEditComponent,
  VulnsListComponent,
} from 'src/app/components/vulns';

export class VulnResource extends AbstractResource {
  protected basePath = 'vulnerabilities';
  protected type = 'VULN';
  protected list = VulnsListComponent;
  protected edit = VulnsEditComponent;
  protected create = VulnsCreateComponent;
}
