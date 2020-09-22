import { Component, OnInit } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
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
  isDay =[];
  temp_celcius=[];
  temp_min =[];
  temp_max =[];
  temp_feels_like =[];


  weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  // days = ['Today', this.weekdays[(this.date).getDay()+1], this.weekdays[(this.date).getDay()+2], this.weekdays[(this.date).getDay()+3], this.weekdays[(this.date).getDay()+4], this.weekdays[(this.date).getDay()+5], this.weekdays[(this.date).getDay()+6]];
  days = ['Today', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'];
  // date: Date = new Date();
  weekday = this.date.getDay();
  Movie: Object;

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
      timezone: true
    };
    this.getforecastData();
  }

  getforecastData() {
    // let data = JSON.parse(
    //   '{"coord":{"lon":72.85,"lat":19.01},"weather":[{"id":721,"main":"Haze","description":"haze","icon":"50n"}],"base":"stations","main":{"temp":297.15,"feels_like":297.4,"temp_min":297.15,"temp_max":297.15,"pressure":1013,"humidity":69},"visibility":3500,"wind":{"speed":3.6,"deg":300},"clouds":{"all":20},"dt":1580141589,"sys":{"type":1,"id":9052,"country":"IN","sunrise":1580089441,"sunset":1580129884},"timezone":19800,"id":1275339,"name":"Mumbai","cod":200}'
    // );

    // let data = JSON.parse('');
    this.fetchData();

    // this.setForecastData(data);
  }

  fetchData() {
    const promise = this.httpClient.get(this._URL + this.parameter).toPromise();
    promise
      .then((data) => {
        this.Movie = data;
        console.log('Data fetched2: ', this.Movie);
        this.setForecastData(this.Movie);
        console.log('New Data2: ', data);
      })
      .catch((error) => {
        console.log('Promise rejected with ' + JSON.stringify(error));
      });
  }

  resetValues(){
  this.sunsetTime = [];
  this.currentDate = [];
  this.sunset_time = [];
  this.isDay =[];
  this.temp_celcius=[];
  this.temp_min =[];
  this.temp_max =[];
  this.temp_feels_like =[];
  }

  setForecastData(data) {

    
    this.ForecastData = data;
    console.log('ForecastData is: ', this.ForecastData);
    let todayDate = new Date();
    console.log('Test');

    for (var i = 0; i < 7; i++) {
      this.sunsetTime.push(new Date(this.ForecastData.daily[i].sunset * 1000));
      this.sunset_time.push(this.sunsetTime[i].toLocaleTimeString());
      this.currentDate.push(new Date(todayDate.setDate(todayDate.getDate() + i)));
      this.ForecastData.isDay.push(this.currentDate[i].getTime() < this.sunsetTime[i].getTime())
      this.ForecastData.temp_min.push((this.ForecastData.daily[i].temp.min - 273.15).toFixed(0));
      this.temp_max.push((this.ForecastData.daily[i].temp.max - 273.15).toFixed(0));
      this.temp_feels_like.push((this.ForecastData.daily[i].feels_like.day - 273.15).toFixed(0));


    }
    

    // for (var i = 0; i < 7; i++) {
    //   this.sunsetTime[i] = new Date(this.ForecastData.daily[i].sunset * 1000);
    //   this.ForecastData.sunset_time[i] = this.sunsetTime[
    //     i
    //   ].toLocaleTimeString();
    //   this.currentDate[i] = todayDate.setDate(todayDate.getDate() + 1);
    //   console.log('Date: ', todayDate.setDate(todayDate.getDate() + 1));
    //   console.log('Why?');
    // }

    console.log("After the mess: ",this.sunsetTime);
    console.log("After the mess: ",this.isDay);
    // console.log("After the mess2: ",this.ForecastData.sunset_time);

    // let sunsetTime = new Date(this.ForecastData.current.sunset * 1000);
    // this.ForecastData.sunset_time = sunsetTime.toLocaleTimeString();
    // let currentDate = new Date();
    // this.ForecastData.isDay = (currentDate.getTime() < sunsetTime.getTime()); //boolean
    // this.ForecastData.temp_celcius = (this.ForecastData.main.temp - 273.15).toFixed(0);
    // this.ForecastData.temp_min = (this.ForecastData.main.temp_min - 273.15).toFixed(0);
    // this.ForecastData.temp_max = (this.ForecastData.main.temp_max - 273.15).toFixed(0);
    // this.ForecastData.temp_feels_like = (this.ForecastData.main.feels_like - 273.15).toFixed(0);
  }
}
