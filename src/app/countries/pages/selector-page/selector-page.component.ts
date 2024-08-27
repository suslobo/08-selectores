import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/country.interfaces';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: ``
})
export class SelectorPageComponent {

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

  get regions(): Region[] {
    return this.countriesService.regions;
  }

}
