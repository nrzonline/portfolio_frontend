import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
    public uniqueReadCount: number;
    public about:any;
    public workExperiences:any;
    public educations:any;
    public interests:any;

    public constructor(private restangular: Restangular,
                       private activatedRoute: ActivatedRoute,
                       private router: Router){
    }

    public ngOnInit(){
        this.getAbout();
        this.getWorkExperiences();
        this.getEducations();
        this.getInterests();
        this.getUniqueRequestCount()
    }

    private getAbout(){
        this.restangular.one('about', 1).get().subscribe(response => {
            this.about = response.plain();
            this.moduleIsReady = true;
        });
    }
    
    private getUniqueRequestCount(){
        this.activatedRoute.params.subscribe((params: Params) => {
            let path = '/about/';
            
            this.restangular.one('').customGET('request-count/' + path + '/unique/').subscribe(response => {
                this.uniqueReadCount = response.plain().count;
            });
        });
    }
    
    private getWorkExperiences(){
        this.restangular.all('work').getList().subscribe(response => {
            this.workExperiences = response.plain();
        });
    }
    
    private getEducations(){
        this.restangular.all('education').getList().subscribe(response => {
            this.educations = response.plain();
        });
    }
    
    private getInterests(){
        this.restangular.all('interest').getList().subscribe(response => {
            this.interests = response.plain();
        });
    }
    
    public changeRoute(route: string, id:number, slug:string){
        this.router.navigate([route, id, slug]);
    }
}
