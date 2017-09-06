import { Input, Component, AfterViewInit } from '@angular/core';
import { Restangular } from 'ng2-restangular';

import { fadeInAnimation, fadeOutAnimation } from '../animations';


@Component({
    selector: 'vote-component-container',
    templateUrl: 'vote.component.html',
    animations: [fadeInAnimation, fadeOutAnimation],
    host: {'[@fadeInAnimation]': '', '[@fadeOutAnimation]': ''}
})

export class VoteComponent implements AfterViewInit {
    
    public _objectId:number;
    public _model:string;
    public votes:any;
    public voteMessage:any;
    
    public constructor(private restangular:Restangular){
        this.votes = [];
        this.voteMessage = [];
    }
    
    public ngAfterViewInit(){
        this.getVotes();
    }
    
    @Input('objectId')
    set objectId(objectId:number){
        this._objectId = objectId;
    }
    
    @Input('model')
    set model(model:string){
        this._model = model;
    }
    
    public getVotes(){
        if(!this._model || !this._objectId) return;
        
        let requestUrl = 'vote/' + this._model + '/' + this._objectId + '/';
        
        this.restangular.one('').customGET(requestUrl).subscribe(response => {
            let votes = response.plain().votes;
            this.votes['thumbs_down'] = votes[0];
            this.votes['thumbs_up'] = votes[1];
            this.votes['love'] = votes[2];
            this.votes['client_vote'] = votes['client_vote'];
        });
    }
    
    public castVote(vote:number){
        let requestUrl = 'vote/' + this._model + '/' + this._objectId + '/' + vote + '/cast';
        
        this.restangular.one('').customGET(requestUrl).subscribe(response => {
            if(response['success']) {
                this.getVotes();
            }
            this.setTemporaryVoteMessage(response);
        });
    }
    
    private setTemporaryVoteMessage(message:any){
        this.voteMessage = message;
        setTimeout(()=> {
            this.voteMessage = [];
        }, 2000);
    }
}
