import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restangular } from 'ng2-restangular';

import { fadeInAnimation } from '../routing-animations';

@Component({
    templateUrl: 'skill_list.component.html',
    styleUrls: ['../../assets/sass/skills.sass'],
    animations: [fadeInAnimation],
    host: {'[@fadeInAnimation]': ''}
})

export class SkillListComponent implements OnInit {
    public moduleIsReady:boolean = false;
    public skills:any;
    public activeSkillId:number = null;

    public constructor(private restangular: Restangular,
                       private router: Router){
    }

    public ngOnInit(){
        this.getSkills();
    }

    private getSkills(){
        let skills = this.restangular.all('skills');

        skills.getList().subscribe(response => {
            this.skills = response;
            this.addSkillLevelPercentageToSkills();
            this.moduleIsReady = true;
            console.log(this.skills.plain());
        })
    }

    private addSkillLevelPercentageToSkills(){
        for(let skill of this.skills){
           skill.level_percentage = skill.level/skill.level_max*100;
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