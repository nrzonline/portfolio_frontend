import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { AppModule } from './app/app.module';


let production = true;
if(production){
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);