import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restangular } from 'ng2-restangular';

import { fadeInAnimation } from '../animations';


@Component({
    selector: 'about',
    templateUrl: 'about.component.html',
    styleUrls: ['../../assets/sass/about.sass'],
    animations: [fadeInAnimation],
    host: {'[@fadeInAnimation]': ''}
})

export class AboutComponent implements OnInit {
    public moduleIsReady:boolean = false;
    public about:any;

    public constructor(private restangular: Restangular,
                       private router: Router){
    }

    public ngOnInit(){
        this.getAbout();
    }

    private getAbout(){
    }

    public changeRoute(route: string, id:number, slug:string){
        this.router.navigate([route, id, slug]);
    }
}
