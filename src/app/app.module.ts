import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrentWeatherComponent } from './Components/current-weather/current-weather.component';
import { SearchCityComponent } from './Components/search-city/search-city.component';
import { SearchService } from './Components/search-city/search.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from "@angular/common/http";
import { ForecastComponent } from './Components/forecast/forecast.component';
import { NotificationComponent } from './Components/notification/notification.component';
import { TripPlannerComponent } from './Components/trip-planner/trip-planner.component';


@NgModule({
  declarations: [
    AppComponent,
    CurrentWeatherComponent,
    SearchCityComponent,
    ForecastComponent,
    NotificationComponent,
    TripPlannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
