import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LayoutPageComponent } from './pages/layout-pages/layout-pages.component';
import { LoguinPageComponent } from './pages/loguin-pages/loguin-pages.component';
import { ReguisterPageComponent } from './pages/reguister-page/reguister-page.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    LoguinPageComponent,
    ReguisterPageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }