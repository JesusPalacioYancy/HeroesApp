import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { filter, switchMap } from 'rxjs';

import { Hero, Publisher } from '../../interfaces/hero.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmDialogComponent } from '../../components/confirmDialog/confirmDialog.component';


@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit{

  // Controlador de Formulario
  public heroForm = new FormGroup({
    id:              new FormControl<string>(''),
    superhero:       new FormControl<string>('', {nonNullable: true}),
    publisher:       new FormControl<Publisher>( Publisher.DCComics),
    alter_ego:       new FormControl<string>(''),
    first_appearance:new FormControl<string>(''),
    characters:      new FormControl<string>(''),
    alt_img:         new FormControl<string>(''),
  });

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ){}

  // Tipar valore obtenidos de form a hero
  get currenHero(): Hero {
    const hero = this.heroForm.value;
    return hero as Hero;
  };

  // Mostrar datos del hero en los campos de edicion
  ngOnInit(): void {
    if(!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.heroesService.getHeroById(id) ),
      ) .subscribe(hero => {
        if(!hero){
          return this.router.navigateByUrl('/');
        };
        return this.heroForm.reset(hero);
      });
  };

  // valores iniciales del selector
  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' }
  ];

  // Agregar o editar por el id
  onSubmint():void {
    if(this.heroForm.invalid) return;

    if(this.currenHero.id) {
      this.heroesService.updateHero(this.currenHero)
        .subscribe( hero => {
          this.showSnakbar(`Se edito con exito el heroe ${hero.superhero}`)
          this.router.navigate(['/heroes/list'])
        });
      return;
    };

    this.heroesService.addHero(this.currenHero)
      .subscribe( hero => {
        this.showSnakbar(`Se agrego con exito el heroe ${hero.superhero}`)
          this.router.navigate(['/heroes/list'])
      });
  };

 // Eliminar dato junto a una pantalla de confirmacion
  onDeleteHero(){
    if(!this.currenHero.id) throw Error('Hero id is required');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef.afterClosed()
      .pipe(
        filter((result: boolean) => result),
        switchMap( () => this.heroesService.deleteHeroByid(this.currenHero.id)),
        filter((wasDeleted: boolean) => wasDeleted )
      )
      .subscribe( () => {
        this.router.navigate(['/heroes'])
      })

    // dialogRef.afterClosed().subscribe(result => {
    //   if(!result) return;

    //   this.heroesService.deleteHeroByid(this.currenHero.id)
    //     .subscribe(wasDeleted => {
    //       if(wasDeleted){
    //         this.router.navigate(['/heroes'])
    //       }
    //     })
    // });
  }

  // Mostra el Snakbar de exito 
  showSnakbar(message: string): void {
    this.snackbar.open(message, 'done', {
      duration: 2500
    })
  }

}
