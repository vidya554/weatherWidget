import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search-city/search.service';
import { Subscription } from 'rxjs';
import { Http } from '@angular/http';
import { HttpClient  } from '@angular/common/http';

import { CurrentWeatherService } from './current-weather.service';
import { strict } from 'assert';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
})
export class CurrentWeatherComponent implements OnInit {

  WeatherData:any;
  public counter = 0;
  public data: any;
  public weatherJSON: any;
  clickEventsubscription: Subscription;
  clickEventsubscription2: Subscription;

  public parameter= 'mumbai/IN';
  public _URL: String = 'http://localhost:3000/weather/current/';
  public ServiceURL:String = '';
  results: any;
  Obj: Object;
  constructor(
    private _searchService: SearchService,
    private _currentWeather: CurrentWeatherService,
    private httpClient: HttpClient
  ) {
    this.clickEventsubscription = this._searchService
      .getClickEvent()
      .subscribe(() => this.getWeatherData());
    this._searchService.myMethod$.subscribe((data) => (this.parameter = data)); // And he have data here too!
  }

  ngOnInit(): void {
    this.WeatherData = {
      current : {},
      city: true,
      daily: [{}],
      isDay: true,
      timezone: true
    };
    this.getWeatherData();
    // this.fetchData();
    
  }

  fetchData(){
    const promise = this.httpClient.get(this._URL+this.parameter).toPromise();
    promise.then((data)=>{
     this.Obj = data
    this.setWeatherData(data);
    }).catch((error)=>{
      console.log("Promise rejected with " + JSON.stringify(error));
    });
  }

  async loadData() {
    if(this.data = 'undefined'){ this.data = this.parameter}
    this.ServiceURL = this._URL.concat(this.data);
    const t= (await this._currentWeather.getData(this.ServiceURL)).subscribe((data: any) => {
      this.weatherJSON = data;
    });
    
  }

   getWeatherData() {
    this.fetchData();
  }

  setWeatherData(received) {
    this.WeatherData = (received);

    let options = {
      timeZone: this.WeatherData.timezone,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    },
    formatter = new Intl.DateTimeFormat([], options);
    // console.log(formatter.format(new Date()));
    

    
    let sunsetTime = new Date(this.WeatherData.current.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay = currentDate.getTime() < sunsetTime.getTime(); //boolean
    this.WeatherData.temp_celcius = (this.WeatherData.current.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.daily[0].temp.min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.daily[0].temp.max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.current.feels_like - 273.15).toFixed(0);
    this.WeatherData.temp_humidity = (this.WeatherData.current.humidity);
    this.WeatherData.name = this.WeatherData.city


  }
 
}
