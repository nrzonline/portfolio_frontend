import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Restangular } from 'ng2-restangular';

import { fadeInAnimation } from '../routing-animations';


@Component({
    selector: 'project',
    templateUrl: 'project_detail.component.html',
    styleUrls: ['../../assets/sass/projects.sass'],
    animations: [fadeInAnimation],
    host: {'[@fadeInAnimation]': ''}
})

export class ProjectDetailComponent implements OnInit {
    public moduleIsReady:boolean = false;
    public project:any;
    public displayImage:any;
    public uniqueReadCount:number;
    public votes:any;

    public constructor(private restangular: Restangular,
                       private router: Router,
                       private activatedRoute: ActivatedRoute){
    }

    public ngOnInit(){
        this.getProject();
        this.getUniqueRequestCount();
        this.getVotes();
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
            let module = 'project';
            let id = params['id'];
            let path = `/${module}/${id}/`;
            
            this.restangular.one('').customGET('request-count/' + path + '/unique/').subscribe(response => {
                this.uniqueReadCount = response.plain().count;
            });
        });
    }
    
    private getVotes(){
        this.activatedRoute.params.subscribe((params: Params) => {
            let model = 'project';
            let id = params['id'];
            let url = `vote/${model}/${id}/`;
        
            this.restangular.one('').customGET(url).subscribe(response => {
                this.votes = response.plain();
                console.log(this.votes);
            });
        });
    }

    public changeDisplayImage(image:string){
        this.displayImage = image;
    }

    public changeRoute(route: string, id:number, slug:string){
        this.router.navigate([route, id, slug]);
    }
}