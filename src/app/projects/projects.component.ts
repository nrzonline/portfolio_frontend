import { Component, OnInit } from '@angular/core';
import { Restangular } from 'ng2-restangular';
import { Router } from '@angular/router';

import { fadeInAnimation } from '../routing-animations';


@Component({
    selector: 'portfolio',
    templateUrl: 'projects.component.html',
    styleUrls: ['../../assets/sass/projects.sass'],
    animations: [fadeInAnimation],
    host: {'[@fadeInAnimation]': ''}
})

export class ProjectsComponent implements OnInit {
    public moduleIsReady:boolean = false;
    public projects:any = [];
    public activeProjectId:number = null;

    public constructor(private restangular: Restangular,
                       private router: Router){
    }

    public ngOnInit(){
        this.getProjects();
    }

    public getProjects(){
        let projects = this.restangular.all('projects');

        projects.getList().subscribe(response => {
            this.projects = response;
            this.moduleIsReady = true;
        });
    }

    public setActiveProject(projectId){
        this.activeProjectId = projectId;
    }

    public resetActiveProject(){
        this.activeProjectId = null;
    }

    public openProject(projectId){
        this.router.navigate(['project', projectId]);
    }
}