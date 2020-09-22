import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-city',
  template: `<section class="filter">
  <div class="keyword-wrapper">
 <input [formControl]="queryField" type="text" id="keyword" placeholder="search for city..." autofocus/>
   </div>
 <ul class="filter-select top">
   <li *ngFor="let result of results; let i= index" [class.active]="selectedIndex ===i" class="filter"><a id="myItem"(click)="setIndex(i)"><div>{{result.city.name}}, {{result.city.country}}</div></a></li>
 </ul>

 </section>`,
  styleUrls: ['./search-city.component.css'],
})


export class SearchCityComponent implements OnInit {
  
  selectedIndex: number = null;
  

  setIndex(index: number) {
    console.log(this.results[index]);
     this.selectedIndex = index;
     this.selectCity(index);
     this._searchService.sendClickEvent();
  }

  selectCity(index){
    var city = this.results[index].city.name + ', ' +this.results[index].city.country;
    var searchParameter = this.results[index].city.name + '/' +this.results[index].city.country;
    this.queryField.setValue(city);
    this._searchService.myMethod(searchParameter);
    console.log("From 1st Service: ",typeof(searchParameter));
  }

  queryField: FormControl = new FormControl();
  results: any[] =[];

  public data = this.queryField.value;


  constructor(private _searchService: SearchService) {
    this._searchService.myMethod(this.data);
  }

  ngOnInit() {
    this.queryField.valueChanges
      .subscribe(queryField =>this._searchService.search(queryField)
      .subscribe(response=> this.results = response.json())
      );
  }
}
