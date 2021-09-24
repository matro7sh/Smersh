import { SideBarComponent } from 'src/app/components/side-bar/side-bar.component';
import { Route, Routes } from '@angular/router';
import {
  CREATE_ROUTE,
  EDIT_ROUTE,
  LIST_ROUTE,
  SHOW_ROUTE,
} from 'src/app/router/router';
import { AuthGuard, RoleGuard } from 'src/app/guard';

export abstract class AbstractResource {
  protected basePath = '';
  protected type = '';
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
        canActivate: [AuthGuard, RoleGuard],
        component: this.create,
        data: { role: `ROLE_${this.type}_POST` },
        path: CREATE_ROUTE,
      },
    ];
  }

  getEditRoute(): Routes {
    if (!this.edit) {
      return [];
    }
    return [
      {
        canActivate: [AuthGuard, RoleGuard],
        component: this.edit,
        data: { role: `ROLE_${this.type}_PATCH` },
        path: EDIT_ROUTE,
      },
    ];
  }

  getListRoute(): Routes {
    if (!this.list) {
      return [];
    }
    return [
      {
        canActivate: [AuthGuard, RoleGuard],
        component: this.list,
        data: { role: `ROLE_${this.type}_GET_LIST` },
        path: LIST_ROUTE,
      },
    ];
  }

  getShowRoute(): Routes {
    if (!this.show) {
      return [];
    }
    return [
      {
        canActivate: [AuthGuard, RoleGuard],
        component: this.show,
        data: { role: `ROLE_${this.type}_GET_ITEM` },
        path: SHOW_ROUTE,
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
      canActivate: [AuthGuard],
      children,
      component: SideBarComponent,
      data: { role: `ROLE_${this.type}_GET_LIST` },
      path: this.basePath,
    };
  }
}
