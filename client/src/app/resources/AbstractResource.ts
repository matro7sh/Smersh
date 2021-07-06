import { SideBarComponent } from 'src/app/components/side-bar/side-bar.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { Route, Routes } from '@angular/router';
import { CREATE_ROUTE, EDIT_ROUTE, LIST_ROUTE, SHOW_ROUTE, } from 'src/app/router/router';

export abstract class AbstractResource {
  protected basePath = '';
  protected list = null;
  protected show = null;
  protected edit = null;
  protected create = null;

  getCreateRoute(): Routes {
    if (!this.create) {
      return [];
    }
    return [
      {
        path: CREATE_ROUTE,
        component: this.create,
      },
    ];
  }

  getEditRoute(): Routes {
    if (!this.edit) {
      return [];
    }
    return [
      {
        path: EDIT_ROUTE,
        component: this.edit,
      },
    ];
  }

  getListRoute(): Routes {
    if (!this.list) {
      return [];
    }
    return [
      {
        path: LIST_ROUTE,
        component: this.list,
      },
    ];
  }

  getShowRoute(): Routes {
    if (!this.show) {
      return [];
    }
    return [
      {
        path: SHOW_ROUTE,
        component: this.show,
      },
    ];
  }

  generateResource(): Route {
    const children = [
      ...this.getListRoute(),
      ...this.getEditRoute(),
      ...this.getCreateRoute(),
      ...this.getShowRoute(),
    ];

    return {
      path: this.basePath,
      component: SideBarComponent,
      canActivate: [AuthGuard],
      children,
    };
  }
}
