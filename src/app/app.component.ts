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
                private ngZone: NgZone,
                private router: Router){
        this.translate.setDefaultLang('en');
        this.translate.use('en');
    }

    public ngOnInit() {
    }

    public ngAfterViewInit(){
        this.rememberScrollPositionOnRouteChange();
        this.adjustBackgroundPosition();
        this.adjustBackgroundPositionOnWindowResize();
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

    private adjustBackgroundPositionOnWindowResize(){
        window.onresize = () => {
            this.adjustBackgroundPosition();
        }
    }

    private adjustBackgroundPosition(){
        this.ngZone.run(() => {
            let width = window.innerWidth;

            if(width >= 800) {
                let bgFirstRow = document.getElementById('bg-first-row');
                let bgSecondRow = document.getElementById('bg-second-row');
                let bgThirdRow = document.getElementById('bg-third-row');
                let bgFourthRow = document.getElementById('bg-fourth-row');
                let bgFifthRow = document.getElementById('bg-fifth-row');
                let bgSixthRow = document.getElementById('bg-sixth-row');

                bgFirstRow.style.left = -1350 + (width / 2) + 'px';
                bgSecondRow.style.left = -2650 + (width / 2) + 'px';
                bgThirdRow.style.left = -2750 + (width / 2) + 'px';
                bgFourthRow.style.left = -1250 + (width / 2) + 'px';
                bgFifthRow.style.left = -2375 + (width / 2) + 'px';
                bgSixthRow.style.left = -1625 + (width / 2) + 'px';
            }
        });
    }
}