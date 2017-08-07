import { Component, AfterViewInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core';
import { NgZone } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['../assets/sass/app.sass']
})

export class AppComponent implements AfterViewInit {
    constructor(private translate: TranslateService, private ngZone: NgZone){
        this.translate.setDefaultLang('en');
        this.translate.use('en');
    }

    public ngAfterViewInit(){
        this.adjustBackgroundPosition();
        this.adjustBackgroundPositionOnWindowResize();
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