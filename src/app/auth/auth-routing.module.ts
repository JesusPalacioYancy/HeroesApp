import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-pages/layout-pages.component';
import { LoguinPageComponent } from './pages/loguin-pages/loguin-pages.component';
import { ReguisterPageComponent } from './pages/reguister-page/reguister-page.component';

// localhost:4200/auth/
const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {path: 'loguin', component: LoguinPageComponent},
      {path: 'new-account', component: ReguisterPageComponent},
      {path: '**', redirectTo: 'loguin'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
