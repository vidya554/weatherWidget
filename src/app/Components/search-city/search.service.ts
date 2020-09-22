import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { jsonpFactory } from '@angular/http/src/http_module';
import { Observable, empty, Subject } from 'rxjs';
// import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  serviceURL: string = 'http://localhost:3000/cities/';
  public searchResults: any;
  private subject = new Subject<any>(); //Reactive components to update other components when search field value changes
  myMethod$: Observable<any>; // Using observable to share updated city/country value between components
  private myMethodSubject = new Subject<any>();

  constructor(private _http: Http) {
    this.myMethod$ = this.myMethodSubject.asObservable();
  }

  myMethod(data) {
    console.log("From shared service: ",data); // I have data! Let's return it so subscribers can use it!
    // we can do stuff with data if we want
    this.myMethodSubject.next(data);
  }

  sendClickEvent() {
    this.subject.next();
  }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  public search(queryString: string): Observable<any> {
    if (queryString === '') {
      return empty();
    } else {
      let _URL = this.serviceURL + queryString;
      let response = this._http.get(_URL);
      return response;
    }
  }
}
