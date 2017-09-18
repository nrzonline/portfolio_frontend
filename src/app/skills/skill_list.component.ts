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
    public categorizedSkills:any = [];
    public moduleHasSkillsToDisplay:boolean = false;

    public constructor(private restangular: Restangular,
                       private router: Router){
    }

    public ngOnInit(){
        this.getCategorizedSkills();
    }

    private getCategorizedSkills(){
        this.restangular.all('skill-category').getList().subscribe(categoriesResponse => {
            let categories:any = categoriesResponse.plain();
            
            if(categories.length == 0){
                this.moduleIsReady = true;
            }
            
            let iterationNumber = 0;
            for(let category of categories){
                let categoryContainer:any = category;
                
                this.restangular.all('').customGET('skill', {
                    'category': category.id
                }).subscribe(skillsResponse => {
                    let skills = skillsResponse.plain();
                    
                    if(skills.length > 0) {
                        categoryContainer['skills'] = skills;
                        this.categorizedSkills.push(categoryContainer);
                    }
                    iterationNumber++;
                    this.setModuleReadyOnLastIteration(iterationNumber, categories.length);
                });
            }
        });
    }
    
    private setModuleReadyOnLastIteration(iterationNumber, iterationLength){
        if(iterationNumber == iterationLength){
            this.moduleIsReady = true;
        }
    }
    
    public getSkillLevelPercentage(level:number, level_max:number){
        return 100-(level/level_max)*100;
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