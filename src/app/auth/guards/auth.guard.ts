import { 
    ActivatedRouteSnapshot, CanActivateFn, CanMatchFn,
    Route, Router, RouterStateSnapshot, UrlSegment, 
} from '@angular/router';

import { Observable, tap } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';



const checkAuthStatus = (): boolean | Observable<boolean> => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router)

    return authService.checkAuthentication()
        .pipe(
            tap( isAuthenticated => {
                if(!isAuthenticated){
                    router.navigate(['./auth/loguin']);
                };
            })
        )
};

export const canActivateGuardAuth: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
   
    return checkAuthStatus();
  };
   
  export const canMatchGuardAuth: CanMatchFn = ( 
    route: Route,
    segments: UrlSegment[]
  ) => {
   
    return checkAuthStatus();
};