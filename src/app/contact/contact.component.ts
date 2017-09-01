import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Restangular } from 'ng2-restangular';

import { fadeInAnimation } from '../animations';


@Component({
    selector: 'about',
    templateUrl: 'contact.component.html',
    styleUrls: ['../../assets/sass/contact.sass'],
    animations: [fadeInAnimation],
    host: {'[@fadeInAnimation]': ''}
})

export class ContactComponent implements OnInit {
    public moduleIsReady:boolean = false;
    public contact:any;

    public constructor(private restangular: Restangular,
                       private router: Router){
    }

    public ngOnInit(){
        this.getContact();
    }

    private getContact(){
    }

    public changeRoute(route: string, id:number, slug:string){
        this.router.navigate([route, id, slug]);
    }
}
