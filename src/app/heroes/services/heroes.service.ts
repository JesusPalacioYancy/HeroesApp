import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { catchError, map, Observable, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interfaces';

@Injectable({
  providedIn: 'root'
})
export class HeroesService{

  private baseUrl: string = environments.baseUrl

  constructor( private http: HttpClient ) { }

  getHeroes(): Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  };

  getHeroById(id: string): Observable<Hero | undefined>{
    return this.http.get<Hero | undefined>(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        catchError(() => of(undefined))
      );
  };

  getSuggestions(query: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes?q=${ query }`)
      .pipe(
        map(heroes => heroes.filter( hero => 
          hero.superhero.toLowerCase().includes(query.toLowerCase())
        ))
      );
  };

  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(`${ this.baseUrl }/heroes`, hero)
  };

  updateHero(hero: Hero): Observable<Hero>{
    if( !hero.id ) throw Error('Hero id is required');
    return this.http.patch<Hero>(`${ this.baseUrl }/heroes/${ hero.id }`, hero)
  };

  deleteHeroByid(id: string): Observable<boolean>{
    if( !id ) throw Error('Hero id is required');
    return this.http.delete<boolean>(`${ this.baseUrl }/heroes/${ id }`)
      .pipe(
        catchError(err => of(false)),
        map(resp => true)
      )
  };

}
