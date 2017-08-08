"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var ng2_restangular_1 = require('ng2-restangular');
var routing_animations_1 = require('../routing-animations');
var ProjectDetailComponent = (function () {
    function ProjectDetailComponent(restangular, activatedRoute) {
        this.restangular = restangular;
        this.activatedRoute = activatedRoute;
        this.moduleIsReady = false;
    }
    ProjectDetailComponent.prototype.ngOnInit = function () {
        this.getProject();
    };
    ProjectDetailComponent.prototype.getProject = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var projectId = params['id'];
            var project = _this.restangular.one('projects', projectId);
            project.get().subscribe(function (response) {
                _this.project = response;
                _this.displayImage = _this.project.published_images[0].image;
                _this.moduleIsReady = true;
            });
        });
    };
    ProjectDetailComponent.prototype.changeDisplayImage = function (image) {
        this.displayImage = image;
    };
    ProjectDetailComponent = __decorate([
        core_1.Component({
            selector: 'project',
            templateUrl: 'project_detail.component.html',
            styleUrls: ['../../assets/sass/project.sass'],
            animations: [routing_animations_1.fadeInAnimation],
            host: { '[@fadeInAnimation]': '' }
        }), 
        __metadata('design:paramtypes', [ng2_restangular_1.Restangular, router_1.ActivatedRoute])
    ], ProjectDetailComponent);
    return ProjectDetailComponent;
}());
exports.ProjectDetailComponent = ProjectDetailComponent;
//# sourceMappingURL=project_detail.component.js.map