import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DecodedToken } from 'src/app/storage/Token';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (new DecodedToken().get()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
