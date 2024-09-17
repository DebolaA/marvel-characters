import { APP_INITIALIZER, inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { EndpointService } from './services/endpoint.service';
import { HttpRequestInterceptor } from './interceptor/http-request.interceptor';
import { HttpResponseInterceptor } from './interceptor/http-response.interceptor';
import { SettingsService } from './services/settings.service';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [
    EndpointService,
    {
      provide: APP_INITIALIZER,
      useFactory: initAppFactory,
      multi: true,
      deps: [SettingsService, HttpClient],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpResponseInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

///Upload config file
export function initAppFactory(init: SettingsService, http: HttpClient) {
  return () => init.initAppConfig();
}
