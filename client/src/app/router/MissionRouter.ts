import { AbstractRouter } from 'src/app/router/router';

export class MissionRouter extends AbstractRouter {
  protected static resource = 'missions';

  public static redirectToList(): string {
    return this.redirectTo('/all');
  }
}
