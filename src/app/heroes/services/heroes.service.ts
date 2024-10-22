import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { catchError, Observable, of } from 'rxjs';
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
      )
  };

  getSuggestions(param: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${param}&_limit=6`)
  };


}
