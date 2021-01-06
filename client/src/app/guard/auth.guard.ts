import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

/**
 * this guard prevent unauthorized
 * user potected pages acess without a token.
 */

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    if (localStorage.getItem('token')) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
