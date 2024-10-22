import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interfaces';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent implements OnInit {

  public hero?: Hero

  constructor(
    private herosService: HeroesService,
    private activateRoute: ActivatedRoute,
    private route: Router
  ){}

  ngOnInit(): void {
    this.activateRoute.params
      .pipe(
        switchMap(({id}) => this.herosService.getHeroById(id))
      )
      .subscribe( hero => {
        if(!hero){
          return this.route.navigateByUrl('heroes/list')
        }
        return this.hero = hero
      })
  }

  goBack():void {
    this.route.navigateByUrl('heroes/list')
  }


}
