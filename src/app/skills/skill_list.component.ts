import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restangular } from 'ng2-restangular';

import { fadeInAnimation, fastFadeInAnimation } from '../animations';

@Component({
    templateUrl: 'skill_list.component.html',
    styleUrls: ['../../assets/sass/skills.sass'],
    animations: [fadeInAnimation, fastFadeInAnimation],
    host: {'[@fadeInAnimation]': '', '[@fastFadeInAnimation]': ''}
})

export class SkillListComponent implements OnInit {
    public moduleIsReady:boolean = false;
    public activeSkillId:number = null;
    public categorizedSkills:any;

    public constructor(private restangular: Restangular,
                       private router: Router){
    }

    public ngOnInit(){
        this.getCategorizedSkills();
    }

    private getCategorizedSkills(){
        this.restangular.all('skill-category').getList().subscribe(response => {
            this.categorizedSkills = response.plain();
            this.addSkillLevelPercentageToCategorizedSkills();
            this.moduleIsReady = true;
        });
    }

    private addSkillLevelPercentageToCategorizedSkills(){
        for(let category of this.categorizedSkills) {
            for(let skill of category.skills) {
                skill.level_percentage = skill.level / skill.level_max * 100;
            }
        }
    }

    public setActiveSkill(id:number){
        this.activeSkillId = id;
    }

    public resetActiveSkill(){
        this.activeSkillId = null;
    }

    public changeRoute(route:string, id:number, slug:string){
        this.router.navigate([route, id, slug]);
    }
}