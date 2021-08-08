import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { DecodedToken } from 'src/app/storage/Token';
import { DashboardRouter } from 'src/app/router/DashboardRouter';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (
      new DecodedToken().get() &&
      new DecodedToken().getDecoded().roles.includes(route.data.role)
    ) {
      return true;
    }

    this.router.navigateByUrl(
      route.routeConfig.path === ''
        ? '/login'
        : DashboardRouter.redirectToList()
    );
    return false;
  }
}
