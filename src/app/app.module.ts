import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http, HttpModule, BaseRequestOptions } from '@angular/http';
import { RestangularModule } from 'ng2-restangular';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { routing } from './routing';
import { SafePipe } from '../pipes/safe.pipe';
import { DataService } from './_services/data_service';

import { ProjectListComponent, ProjectDetailComponent } from './projects/index';
import { SkillListComponent, SkillDetailComponent } from './skills/index';
import { AboutComponent } from './about/index';
import { ContactComponent } from './contact/index';


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
               deps: [Http],
           }
       }),
   ],
    declarations: [
        AppComponent,
        SafePipe,
        ProjectListComponent,
        ProjectDetailComponent,
        SkillListComponent,
        SkillDetailComponent,
        AboutComponent,
        ContactComponent,
    ],
    bootstrap: [
        AppComponent,
    ],
    providers: [
        BaseRequestOptions,
        DataService,
    ]
})

export class AppModule {
    constructor(){}
}

