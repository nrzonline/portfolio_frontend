import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Restangular } from 'ng2-restangular';

import { fadeInAnimation } from '../animations';
import { VoteComponent } from '../vote/vote.component';


@Component({
    selector: 'skill',
    templateUrl: 'skill_detail.component.html',
    styleUrls: ['../../assets/sass/skills.sass'],
    animations: [fadeInAnimation],
    host: {'[@fadeInAnimation]': ''}
})

export class SkillDetailComponent implements OnInit {
    public skill:any;
    
    public moduleIsReady:boolean = false;
    public voteComponentRef:any;
    public uniqueReadCount:number;

    public constructor(private restangular: Restangular,
                       private activatedRoute: ActivatedRoute,
                       private componentFactoryResolver: ComponentFactoryResolver,
                       private viewContainerRef: ViewContainerRef){
    }

    public ngOnInit(){
        this.getSkill();
        this.getUniqueRequestCount();
        this.factoryVoteComponent();
    }

    private getSkill(){
        this.activatedRoute.params.subscribe((params: Params) => {
            let skillId = params['id'];

            this.restangular.one('skill', skillId).get().subscribe(response => {
                this.skill = response.plain();
                this.moduleIsReady = true;
            });
        });
    }
    
    private getUniqueRequestCount(){
        this.activatedRoute.params.subscribe((params: Params) => {
            let projectId = params['id'];
            let path = 'skill/' + projectId;
            
            this.restangular.one('').customGET('views/' + path + '/unique/').subscribe(response => {
                this.uniqueReadCount = response.plain().count;
            });
        });
    }
    
    @ViewChild('voteComponentContainer', {read: ViewContainerRef}) target: ViewContainerRef;
    private factoryVoteComponent(){
        let voteComponentFactory = this.componentFactoryResolver.resolveComponentFactory(VoteComponent);
        this.voteComponentRef = this.viewContainerRef.createComponent(voteComponentFactory);
        this.voteComponentRef.changeDetectorRef.detectChanges();
   }
}
