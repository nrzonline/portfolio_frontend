import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, BaseRequestOptions } from '@angular/http';
import { RestangularModule, RestangularHttp, Restangular } from 'ng2-restangular';

import { routing } from './app.routing';
// import { AppComponent } from './_app/app.component';
import { ProjectsComponent } from './_projects/projects.component';


export function RestangularConfigFactory(Restangular){
    Restangular.setBaseUrl('http://localhost:8000/api/');
    Restangular.setRequestSuffix('/');
    Restangular.addResponseInterceptor(function(data, operation, what, url, response, deferred){
       var extractedData = data.result;
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
        // AppComponent,
        ProjectsComponent
    ],
    bootstrap: [
        // AppComponent
        ProjectsComponent
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

