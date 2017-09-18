import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http, HttpModule, BaseRequestOptions } from '@angular/http';
import { RestangularModule } from 'ng2-restangular';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule } from '@angular/forms';

import { routing } from './routing';
import { AppComponent } from './app.component';

import { ProjectListComponent, ProjectDetailComponent } from './projects/index';
import { SkillListComponent, SkillDetailComponent } from './skills/index';
import { AboutComponent } from './about/index';
import { ContactComponent } from './contact/index';
import { VoteComponent } from './vote/index';
import { SidebarProfileComponent } from './profile/index';

import { SafePipe, KeysPipe } from '../pipes/index';


export function HttpLoaderFactory(http: Http){
    return new TranslateHttpLoader(http, '/src/assets/i18n/', '.json');
}

export function RestangularConfigFactory(Restangular){
    // Restangular.setBaseUrl('http://api.nrzonline.nl');
    Restangular.setBaseUrl('http://localhost:9000');
    Restangular.setRequestSuffix('/');
    Restangular.setDefaultHeaders({'Content-Type': 'application/json'});
}

@NgModule({
   imports: [
       BrowserModule,
       routing,
       HttpModule,
       FormsModule,
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
        KeysPipe,
        ProjectListComponent,
        ProjectDetailComponent,
        SkillListComponent,
        SkillDetailComponent,
        AboutComponent,
        ContactComponent,
        VoteComponent,
        SidebarProfileComponent,
    ],
    bootstrap: [
        AppComponent,
    ],
    entryComponents: [
        VoteComponent,
        SidebarProfileComponent,
    ],
    providers: [
        BaseRequestOptions,
    ]
})

export class AppModule {
    constructor(){}
}

