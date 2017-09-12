import { Input, Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Restangular } from 'ng2-restangular';

import { fadeInAnimation } from '../animations';
import { SidebarProfileComponent } from '../profile/sidebar_profile.component';


@Component({
    selector: 'about',
    templateUrl: 'contact.component.html',
    styleUrls: ['../../assets/sass/contact.sass'],
    animations: [fadeInAnimation],
    host: {'[@fadeInAnimation]': ''}
})

export class ContactComponent implements OnInit {
    @Input() name:string;
    @Input() email:string;
    @Input() phone:string;
    @Input() organization:string;
    @Input() subject:string;
    @Input() message:string;
    
    public moduleIsReady:boolean = false;
    public contact:any;
    public profileId:number;
    public formErrors:any = [];
    public formSubmitted:boolean;
    public formSending:boolean;
    
    public sidebarProfileComponentRef:any;

    public constructor(private restangular: Restangular,
                       private componentFactoryResolver: ComponentFactoryResolver,
                       private viewContainerRef: ViewContainerRef,
                       private router: Router){
        this.profileId = 1;
    }

    public ngOnInit(){
        this.getContact();
        this.factorySidebarProfileComponent();
    }

    private getContact(){
    }
    
    public sendContactForm(){
        let contactFormBody = this.buildContactFormBody();
        this.formSending = true;
        
        this.restangular.all('contact-message').customPOST(contactFormBody).subscribe(response => {
            this.formSubmitted = true;
            this.formErrors = [];
            this.formSending = false;
        }, errorResponse => {
            this.formErrors = errorResponse.data;
            this.formSending = false;
        });
    }
    
    private buildContactFormBody(){
        return {
            'name': this.name,
            'email': this.email,
            'phone': this.phone,
            'organization': this.organization,
            'subject': this.subject,
            'message': this.message,
        }
    }
    
    @ViewChild('sidebarProfileContainer', {read: ViewContainerRef}) target: ViewContainerRef;
    private factorySidebarProfileComponent(){
        let sidebarProfileComponentFactory = this.componentFactoryResolver.resolveComponentFactory(SidebarProfileComponent);
        this.sidebarProfileComponentRef = this.viewContainerRef.createComponent(sidebarProfileComponentFactory);
        this.sidebarProfileComponentRef.changeDetectorRef.detectChanges();
    }
    
    public changeRoute(route: string, id:number, slug:string){
        this.router.navigate([route, id, slug]);
    }
}
