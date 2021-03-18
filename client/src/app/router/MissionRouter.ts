import { AbstractRouter } from 'src/app/router/router';

export const ADD_VULN_ROUTE = ':id/add-vuln/:targetHost';

export class MissionRouter extends AbstractRouter {
  protected static resource = 'missions';

  public static redirectToAddVuln(id: string, targetHostIRI: string): string {
    return this.redirectTo(
      `/${ADD_VULN_ROUTE.replace(':id', id).replace(
        ':targetHost',
        this.getIdFromIRI(targetHostIRI)
      )}`
    );
  }

  public static redirectToList(): string {
    return this.redirectTo('/all');
  }
}
