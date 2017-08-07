import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Restangular } from 'ng2-restangular';


@Component({
    selector: 'portfolio',
    templateUrl: 'project.component.html',
    styleUrls: ['../../assets/sass/project.sass'],
})

export class ProjectComponent implements OnInit {
    public project:any;

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
            });
        });
    }
}