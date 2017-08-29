import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Restangular } from 'ng2-restangular';

import { fadeInAnimation } from '../routing-animations';

@Component({
    templateUrl: 'skill_detail.component.html',
    styleUrls: ['../../assets/sass/skills.sass'],
    animations: [fadeInAnimation],
    host: {'[@fadeInAnimation]': ''}
})

export class SkillDetailComponent implements OnInit {
    public moduleIsReady:boolean = false;
    public skill:any;

    public constructor(private restangular: Restangular,
                       private route: ActivatedRoute){
    }

    public ngOnInit(){
        this.getSkill();
    }

    private getSkill(){
        this.route.params.subscribe((params: Params) => {
            let skillId = params['id'];
            let project = this.restangular.one('skill', skillId);

            project.get().subscribe(response => {
                this.skill = response;
                this.moduleIsReady = true;
            });
        });
    }
}
