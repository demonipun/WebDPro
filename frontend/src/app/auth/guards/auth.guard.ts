import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // userService to get the authentication status of the user && router to re-direct the user when the user is not authenticated
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.userService.currentUser.token) return true;

      this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}})
      // re-direct the user to the login page with the query params of url of the component that needs to be activated
      return false;
  }

}
