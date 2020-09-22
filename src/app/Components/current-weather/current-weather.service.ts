import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable, empty, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class CurrentWeatherService {
  
  serviceURL: string = 'http://localhost:3000/weather/current/';
  public weatherData: any;

  constructor(private _http: Http) {}

  async getData(url: any) {
    var urlPrefix = url;
    this.weatherData = await this._http.get(urlPrefix);
    return this.weatherData;
    }
    


}
