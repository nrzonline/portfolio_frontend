import { Component, OnInit } from '@angular/core';
import { Restangular } from 'ng2-restangular';
import { Router } from '@angular/router';

import { fadeInAnimation, fastFadeInAnimation } from '../animations';


@Component({
    selector: 'portfolio',
    templateUrl: 'project_list.component.html',
    styleUrls: ['../../assets/sass/projects.sass'],
    animations: [fadeInAnimation, fastFadeInAnimation,],
    host: {'[@fadeInAnimation]': '', '[@fastFadeInAnimation]': '',}
})

export class ProjectListComponent implements OnInit {
    public moduleIsReady:boolean = false;
    public activeProjectId:number = null;
    public projects:any = [];

    public constructor(private restangular: Restangular,
                       private router: Router){
    }

    public ngOnInit(){
        this.getProjects();
    }

    private getProjects(){
        let projects = this.restangular.all('project');

        projects.getList().subscribe(response => {
            this.projects = response;
            this.moduleIsReady = true;
        });
    }

    public setActiveProject(id:number){
        this.activeProjectId = id;
    }

    public resetActiveProject(){
        this.activeProjectId = null;
    }

    public changeRoute(route: string, id:number, slug:string){
        this.router.navigate([route, id, slug]);
    }
}