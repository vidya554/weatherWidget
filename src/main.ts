import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import "rxjs/add/operator/map";
// import "rxjs/add/operator/debounceTime";
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import "rxjs"; 

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
