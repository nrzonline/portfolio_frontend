import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/index';
import { ProjectListComponent, ProjectDetailComponent } from './projects/index';
import { SkillListComponent, SkillDetailComponent } from './skills/index';


const appRoutes: Routes = [
    { path: '', component: ProjectListComponent },
    { path: 'projects', component: ProjectListComponent },
    { path: 'projects/:id', component: ProjectDetailComponent },
    { path: 'projects/:id/:slug', component: ProjectDetailComponent },

    { path: 'skills', component: SkillListComponent },
    { path: 'skills/:id', component: SkillDetailComponent },
    { path: 'skills/:id/:slug', component: SkillDetailComponent },

    { path: 'about', component: AboutComponent },

    // { path: '404', component: notFoundComponent },
    // { path: '*', redirectTo: '/404' }
];

export const routing = RouterModule.forRoot(appRoutes);

