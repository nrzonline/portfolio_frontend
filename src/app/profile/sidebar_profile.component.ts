import { Component, AfterViewInit, Input } from '@angular/core';
import { Restangular } from 'ng2-restangular';


@Component({
    selector: 'sidebar-profile-component-container',
    templateUrl: 'sidebar_profile.component.html',
    styleUrls: ['../../assets/sass/profile.sass'],
})

export class SidebarProfileComponent implements AfterViewInit {
    public moduleIsReady:boolean;
    public _profileId:number;
    private profile:any;
    
    public constructor(private restangular:Restangular){
       this.profile = [];
    }
    
    public ngAfterViewInit(){
        this.getProfile();
    }
    
    @Input('profileId')
    set profileId(profileId:number){
        this._profileId = profileId;
    }
    
    private getProfile(){
        if(!this._profileId) return;
        
        this.restangular.one('profile', this._profileId).get().subscribe(response => {
            this.profile = response.plain();
            this.moduleIsReady = true;
        });
    }
}
