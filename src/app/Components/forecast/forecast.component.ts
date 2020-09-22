import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchService } from '../search-city/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
})
export class ForecastComponent implements OnInit {
  ForecastData: any;
  friends: any;
  date: Date = new Date();
  public parameter = 'mumbai/IN';
  public _URL: String = 'http://localhost:3000/weather/current/forecast/';
  clickEventsubscription: Subscription;
  clickEventsubscription2: Subscription;
  sunsetTime = [];
  currentDate = [];
  sunset_time = [];
  isDay = [];
  temp_celcius = [];
  temp_min = [];
  temp_max = [];
  temp_feels_like = [];

  weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  days = ['Today', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'];
  weekday = this.date.getDay();
  Obj: Object;

  constructor(
    private _searchService: SearchService,
    private httpClient: HttpClient
  ) {
    this.clickEventsubscription = this._searchService
      .getClickEvent()
      .subscribe(() => this.getforecastData());
    this._searchService.myMethod$.subscribe((data) => (this.parameter = data)); // And he have data here too!
  }

  ngOnInit(): void {
    this.ForecastData = {
      current: {},
      city: true,
      daily: [{}],
      isDay: true,
      timezone: true,
    };
    this.getforecastData();
  }

  getforecastData() {
    this.fetchData();
  }

  fetchData() {
    const promise = this.httpClient.get(this._URL + this.parameter).toPromise();
    promise
      .then((data) => {
        this.Obj = data;
        this.setForecastData(this.Obj);
      })
      .catch((error) => {
        console.log('Promise rejected with ' + JSON.stringify(error));
      });
  }

  resetValues() {
    this.sunsetTime = [];
    this.currentDate = [];
    this.sunset_time = [];
    this.isDay = [];
    this.temp_celcius = [];
    this.temp_min = [];
    this.temp_max = [];
    this.temp_feels_like = [];
  }

  setForecastData(data) {
    this.ForecastData = data;
    console.log('ForecastData is: ', this.ForecastData);
    let todayDate = new Date();
    console.log('Test');

    for (var i = 0; i < 7; i++) {
      this.sunsetTime.push(new Date(this.ForecastData.daily[i].sunset * 1000));
      this.sunset_time.push(this.sunsetTime[i].toLocaleTimeString());
      this.currentDate.push(
        new Date(todayDate.setDate(todayDate.getDate() + i))
      );
      this.ForecastData.isDay.push(
        this.currentDate[i].getTime() < this.sunsetTime[i].getTime()
      );
      this.ForecastData.temp_min.push(
        (this.ForecastData.daily[i].temp.min - 273.15).toFixed(0)
      );
      this.temp_max.push(
        (this.ForecastData.daily[i].temp.max - 273.15).toFixed(0)
      );
      this.temp_feels_like.push(
        (this.ForecastData.daily[i].feels_like.day - 273.15).toFixed(0)
      );
    }
  }
}
