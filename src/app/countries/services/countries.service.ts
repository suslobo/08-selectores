import { Injectable } from '@angular/core';
import { Region, SmallCountry } from '../interfaces/country.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  //lo hacemos privado para que nadie pueda tocar las regiones
  private _regions: Region[] = [ Region.Africa, Region.Americas, Region.Asia, Region.Europe, Region.Oceania ];

  constructor() { }

  get regions(): Region[] {
    return [...this._regions ]
  }

  //traemos los países que estén en esa región y creamos nuevo método
  getCountriesByRegion( region: Region ): SmallCountry[] {


    return [];

  }







}
