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

    public constructor(private restangular: Restangular,
                       private router: Router,
                       private route: ActivatedRoute){
    }

    public ngOnInit(){
        this.getProject();
    }

    private getProject(){
        this.route.params.subscribe((params: Params) => {
            let projectId = params['id'];
            let project = this.restangular.one('project', projectId);

            project.get().subscribe(response => {
                this.project = response;
                this.displayImage = this.project.published_images[0].image;
                this.moduleIsReady = true;
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