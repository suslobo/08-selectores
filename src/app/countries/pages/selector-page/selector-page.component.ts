import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/country.interfaces';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: ``
})
export class SelectorPageComponent implements OnInit {

  public myForm: FormGroup = this.fb.group({
    region: ['', Validators.required ],
    country: ['', Validators.required ],
    borders: ['', Validators.required ],
  })
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
  }

  get regions(): Region[] {
    return this.countriesService.regions;
  }

  //creamos un nuevo método y va a tener toda la implemtación
  onRegionChanged(): void {
    this.myForm.get('retion')!.valueChanges
    .subscribe( region => {
      console.log({ region })
    });
  }

}
