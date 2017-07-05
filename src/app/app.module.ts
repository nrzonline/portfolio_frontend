import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, BaseRequestOptions } from '@angular/http';
import { RestangularModule, RestangularHttp, Restangular } from 'ng2-restangular';

import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';


export function RestangularConfigFactory(Restangular){
    Restangular.setBaseUrl('http://localhost:8000/api/');
    Restangular.setRequestSuffix('/');
    Restangular.addResponseInterceptor(function(data, operation, what, url, response, deferred){
       let extractedData = data.result;
       if(operation === 'getList'){
           extractedData = data;
       }
       return extractedData;
    });
}

@NgModule({
   imports: [
       BrowserModule,
       routing,
       HttpModule,
       RestangularModule.forRoot(RestangularConfigFactory),
   ],
    declarations: [
        AppComponent,
        ProjectsComponent
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        BaseRequestOptions
    ]
})

export class AppModule {
    constructor(){}
}
export class RestComponent {
    constructor(){}
}

