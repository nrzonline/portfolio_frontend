import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Restangular } from 'ng2-restangular';

import { fadeInAnimation } from '../animations';
import { SidebarProfileComponent } from '../profile/sidebar_profile.component';


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
    public profileId;
    
    public profile:any;
    public workExperiences:any;
    public educations:any;
    public interests:any;
    
    public sidebarProfileComponentRef:any;

    public constructor(private restangular: Restangular,
                       private activatedRoute: ActivatedRoute,
                       private componentFactoryResolver: ComponentFactoryResolver,
                       private viewContainerRef: ViewContainerRef,
                       private router: Router){
        this.profileId = 1;
    }

    public ngOnInit(){
        this.getProfile();
        this.getWorkExperiences();
        this.getEducations();
        this.getInterests();
        this.getUniqueRequestCount();
        this.factorySidebarProfileComponent();
    }

    private getProfile(){
        this.restangular.one('profile', this.profileId).get().subscribe(response => {
            this.profile = response.plain();
            this.moduleIsReady = true;
        });
    }
    
    private getUniqueRequestCount(){
        this.activatedRoute.params.subscribe((params: Params) => {
            let path = 'profile/' + this.profileId;
            
            this.restangular.one('').customGET('views/' + path + '/unique/').subscribe(response => {
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
    
    @ViewChild('sidebarProfileContainer', {read: ViewContainerRef}) target: ViewContainerRef;
    private factorySidebarProfileComponent(){
        let sidebarProfileComponentFactory = this.componentFactoryResolver.resolveComponentFactory(SidebarProfileComponent);
        this.sidebarProfileComponentRef = this.viewContainerRef.createComponent(sidebarProfileComponentFactory);
        this.sidebarProfileComponentRef.changeDetectorRef.detectChanges();
    }
    
    public changeRoute(route: string, id:number, slug:string){
        this.router.navigate([route, id, slug]);
    }
}
