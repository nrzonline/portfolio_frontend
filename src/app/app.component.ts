import { Component, AfterViewInit, OnInit, OnDestroy, NgZone, Renderer } from '@angular/core'
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['../assets/sass/app.sass'],
})

export class AppComponent implements AfterViewInit, OnInit, OnDestroy {
    private routerSubscription:Subscription;

    private _routeScrollPositions: {[url: string] : number}[] = [];
    private _subscriptions: Subscription[] = [];

    constructor(private translate: TranslateService,
                private router: Router){
        this.translate.setDefaultLang('en');
        this.translate.use('en');
    }

    public ngOnInit() {
    }

    public ngAfterViewInit(){
        this.rememberScrollPositionOnRouteChange();
    }
    
    public ngOnDestroy() {
        this.routerSubscription.unsubscribe();
        this._subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    private rememberScrollPositionOnRouteChange(){
        this._subscriptions.push(
            this.router.events.pairwise().subscribe(([prevRouteEvent, currRouteEvent]) => {
                if(prevRouteEvent instanceof NavigationEnd && currRouteEvent instanceof NavigationStart){
                    this._routeScrollPositions[
                        prevRouteEvent.urlAfterRedirects || prevRouteEvent.url] = window.pageYOffset;
                }
                if(currRouteEvent instanceof NavigationEnd){
                    window.scrollTo(
                        0, this._routeScrollPositions[currRouteEvent.urlAfterRedirects || currRouteEvent.url || 0]
                    );
                }
            })
        );
    }
}