import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent {

  public heroForm = new FormGroup({
    id:              new FormControl<string>(''),
    superhero:       new FormControl<string>('', {nonNullable: true}),
    publisher:       new FormControl<Publisher>( Publisher.DCComics),
    alter_ego:       new FormControl<string>(''),
    first_appearance:new FormControl<string>(''),
    characters:      new FormControl<string>(''),
    alt_img:         new FormControl<string>(''),
  });

  constructor(private heroesService: HeroesService){}

  get currenHero(): Hero {
    const hero = this.heroForm.value;
    return hero as Hero;
  }

  public publishers = [
    { id: 'dc_comics', desc: 'DC - Comics' },
    { id: 'marvel-comics', desc: 'Marvel - Comics' }
  ];

  onSubmint():void {
    if(this.heroForm.invalid) return;

    if(this.currenHero.id) {
      this.heroesService.updateHero(this.currenHero)
        .subscribe( hero => {

        });
      return;
    }

    this.heroesService.addHero(this.currenHero)
      .subscribe( hero => {

      });

  }

}
