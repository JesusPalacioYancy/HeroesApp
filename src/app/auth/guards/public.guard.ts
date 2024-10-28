import { 
    ActivatedRouteSnapshot, CanActivateFn, CanMatchFn,
    Route, Router, RouterStateSnapshot, UrlSegment, 
} from '@angular/router';

import { map, Observable, tap } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';



const checkAuthStatus = (): boolean | Observable<boolean> => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router)

    return authService.checkAuthentication()
        .pipe(
            tap( isAuthenticated => {
                if(isAuthenticated){
                    router.navigate(['./']);
                };
            }),
            map(isAuthenticated => isAuthenticated = !isAuthenticated)
        )
};

export const canActivateGuardPublic: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
   
    return checkAuthStatus();
  };
   
  export const canMatchGuardPublic: CanMatchFn = ( 
    route: Route,
    segments: UrlSegment[]
  ) => {
   
    return checkAuthStatus();
};