import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/country.interfaces';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: []
})
export class SelectorPageComponent implements OnInit {

  public countriesByRegion: SmallCountry[] = [];
  public borders: string[] = [];

  public myForm: FormGroup = this.fb.group({
    region: ['', Validators.required ],
    country: ['', Validators.required ],
    border: ['', Validators.required ],
  });
  //hay que enlazar el myForm con el html


  //inyectamos nuestro servicio de countries.service
  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService,   // como es privado hay que hacer un get
  ) {}

  //al implementar el OnInit tenemos acceso a nuestros servicios intectados (countriesService)
  //y a las propiedades (region, country, borders)
  ngOnInit(): void {
   /*  this.myForm.get('retion')!.valueChanges
      .subscribe( region => {
        console.log({ region })
      }); */
    this.onRegionChanged();
    // this.onCountryChanged();
    this.onCountryChanged();

  }

  get regions(): Region[] {
    return this.countriesService.regions;
  }


  //creamos un nuevo método y va a tener toda la implemtación
  //aquí cambia la región
  onRegionChanged(): void {
    this.myForm.get('region')!.valueChanges
    .pipe(
      tap( () => this.myForm.get('country')!.setValue('') ), //antes de que pidamos los países lo estamos limpiamos
      tap( (region) => this.borders = []),
      switchMap( (region) => this.countriesService.getCountriesByRegion(region) ),
    )
    .subscribe( countries => {
      this.countriesByRegion = countries;
    });
  }

  //para verificar qué fronteras tiene el país (tercer selector)
  onCountryChanged(): void {
    this.myForm.get('country')!.valueChanges
    .pipe(
      tap( () => this.myForm.get('border')!.setValue('') ), //antes de que pidamos los países lo estamos limpiamos
      filter( (value: string) => value.length > 0),
      switchMap( (alphaCode) => this.countriesService.getCountryByAlphaCode(alphaCode) ),
    )
    .subscribe( country => {
      this.borders = country.borders;
    });
  }

}

