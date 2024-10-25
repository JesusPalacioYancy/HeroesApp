import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-loguin-pages',
  templateUrl: './loguin-pages.component.html',
  styles: ``
})
export class LoguinPageComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  onLoguin(): void {
    this.authService.loguin('palacioj104@gmail.com', '123456789')
      .subscribe( user => {
        this.router.navigate(['/']);
    });
  };

}
