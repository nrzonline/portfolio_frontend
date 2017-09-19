import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Restangular } from 'ng2-restangular';

import { fadeInAnimation } from '../animations';
import { VoteComponent } from '../vote/vote.component';


@Component({
    selector: 'project',
    templateUrl: 'project_detail.component.html',
    styleUrls: ['../../assets/sass/projects.sass'],
    animations: [fadeInAnimation],
    host: {'[@fadeInAnimation]': ''}
})

export class ProjectDetailComponent implements OnInit {
    public project:any;
    
    public moduleIsReady:boolean = false;
    public displayImage:any;
    public uniqueReadCount:number;
    public votes:any;
    public voteComponentRef:any;

    public constructor(private restangular: Restangular,
                       private router: Router,
                       private activatedRoute: ActivatedRoute,
                       private componentFactoryResolver: ComponentFactoryResolver,
                       private viewContainerRef: ViewContainerRef){
    }
    
    public ngOnInit(){
        this.getProject();
        this.getUniqueRequestCount();
        this.factoryVoteComponent();
    }
    
    private getProject(){
        this.activatedRoute.params.subscribe((params: Params) => {
            let projectId = params['id'];
            let project = this.restangular.one('project', projectId);

            project.get().subscribe(response => {
                this.project = response;
                this.displayImage = this.project.published_images[0].image;
                this.moduleIsReady = true;
            });
        });
    }
    
    private getUniqueRequestCount(){
        this.activatedRoute.params.subscribe((params: Params) => {
            let projectId = params['id'];
            let path = 'project/' + projectId + '';
            
            this.restangular.one('').customGET('views/' + path + '/unique/').subscribe(response => {
                this.uniqueReadCount = response.plain().count;
            });
        });
    }
    
    @ViewChild('voteComponentContainer', {read: ViewContainerRef}) target: ViewContainerRef;
    private factoryVoteComponent(){
        let voteComponentFactory = this.componentFactoryResolver.resolveComponentFactory(VoteComponent);
        this.voteComponentRef = this.viewContainerRef.createComponent(voteComponentFactory);
        this.voteComponentRef.changeDetectorRef.detectChanges();
    }

    public changeRoute(route: string, id:number, slug:string){
        this.router.navigate([route, id, slug]);
    }
}