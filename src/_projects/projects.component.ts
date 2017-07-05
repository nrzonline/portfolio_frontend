import { Component, OnInit } from '@angular/core';
import { Restangular } from "ng2-restangular";


@Component({
    selector: 'portfolio',
    templateUrl: 'projects.component.html',
    styleUrls: ['./projects.sass'],
})

export class ProjectsComponent implements OnInit {
    public allProjects;

    constructor(private restangular: Restangular){
    }

    ngOnInit(){
        this.getProjects();
    }

    getProjects(){
        let projects = this.restangular.all('projects');

        projects.getList().subscribe(accounts => {
            this.allProjects = accounts.plain();
            console.log(this.allProjects);
        });
    }
}