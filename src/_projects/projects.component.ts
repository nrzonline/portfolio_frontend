import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";
import { AppComponent } from "../_app/app.component";


@Component({
    templateUrl: 'projects.component.html'
})

export class ProjectsComponent {
    constructor(
        private router : Router,
        private appComponent : AppComponent
    ){}
}