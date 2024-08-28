import { Injectable } from '@angular/core';
import { Region, SmallCountry } from '../interfaces/country.interfaces';
import { Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  //nos creamos una propiedad baseUrl
  private baseUrl: string = 'https://restcountries.com/v3.1'

  //lo hacemos privado para que nadie pueda tocar las regiones
  private _regions: Region[] = [ Region.Africa, Region.Americas, Region.Asia, Region.Europe, Region.Oceania ];

  constructor(
    //para hacer la petición https://restcountries.com/v3.1/region/americas?fields=cca3,name,borders
    private http: HttpClient
  ) {}

  get regions(): Region[] {
    return [...this._regions ]
  }

  //traemos los países que estén en esa región y creamos nuevo método

  getCountriesByRegion( region: Region ): Observable<SmallCountry[]> {
    if (!region) return of([]); //si la región no viene regreso un array vacio

    const url: string = `${ this.baseUrl }/region/${ region }?fields=cca3,name,borders`;

    return this.http.get<SmallCountry[]>(url)
      .pipe(
        tap( response => console.log({ response }) )
      )

    }
  }
