import { Injectable } from '@angular/core';
import { Country, Region, SmallCountry } from '../interfaces/country.interfaces';
import { Observable, of, tap, map } from 'rxjs';
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

    return this.http.get<Country[]>(url)
      .pipe(
        map( countries => countries.map( country => ({
          name: country.name.common,
          cca3: country.cca3,
          borders: country.borders ?? []
        })) ),
      )
    }
    //nuevo método
    getCountryByAlphaCode( alphaCode: string ): Observable<SmallCountry> {

      const url =`${ this.baseUrl }/alpha/${ alphaCode }?fields=cca3,name,borders`;
      return this.http.get<Country>( url )
        .pipe(
          map( country => ({
            name: country.name.common,
          cca3: country.cca3,
          borders: country.borders ?? [],
          }))
        )
    }

  }
