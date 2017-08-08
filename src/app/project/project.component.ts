import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Restangular } from 'ng2-restangular';

import { fadeInAnimation } from '../routing-animations';


@Component({
    selector: 'project',
    templateUrl: 'project.component.html',
    styleUrls: ['../../assets/sass/project.sass'],
    animations: [fadeInAnimation],
    host: {'[@fadeInAnimation]': ''}
})

export class ProjectComponent implements OnInit {
    public moduleIsReady:boolean = false;
    public project:any;
    public displayImage:any;

    public constructor(private restangular: Restangular,
                       private activatedRoute: ActivatedRoute){
    }

    public ngOnInit(){
        this.getProject();
    }

    public getProject(){
        this.activatedRoute.params.subscribe((params: Params) => {
            let projectId = params['id'];
            let project = this.restangular.one('projects', projectId);

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
}