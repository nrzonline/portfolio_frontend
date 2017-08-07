import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http, HttpModule, BaseRequestOptions } from '@angular/http';
import { RestangularModule } from 'ng2-restangular';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './project/project.component';

import { SafePipe } from '../pipes/safe.pipe';


export function HttpLoaderFactory(http: Http){
    return new TranslateHttpLoader(http, '/src/assets/i18n/', '.json');
}

export function RestangularConfigFactory(Restangular){
    Restangular.setBaseUrl('http://localhost:8000/api/');
    Restangular.setRequestSuffix('/');
}

@NgModule({
   imports: [
       BrowserModule,
       routing,
       HttpModule,
       RestangularModule.forRoot(RestangularConfigFactory),
       TranslateModule.forRoot({
           loader: {
               provide: TranslateLoader,
               useFactory: HttpLoaderFactory,
               deps: [Http]
           }
       })
   ],
    declarations: [
        AppComponent,
        ProjectsComponent,
        ProjectComponent,
        SafePipe,
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

