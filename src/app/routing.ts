import { Routes, RouterModule } from '@angular/router';

import { ProjectListComponent, ProjectDetailComponent } from './projects/index';
import { SkillListComponent, SkillDetailComponent } from './skills/index';
import { AboutComponent } from './about/index';
import { ContactComponent } from './contact/index';


const appRoutes: Routes = [
    { path: '', component: ProjectListComponent },
    { path: 'project', component: ProjectListComponent },
    { path: 'project/:id', component: ProjectDetailComponent },
    { path: 'project/:id/:slug', component: ProjectDetailComponent },

    { path: 'skills', component: SkillListComponent },
    { path: 'skills/:id', component: SkillDetailComponent },
    { path: 'skills/:id/:slug', component: SkillDetailComponent },

    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },

    // { path: '404', component: notFoundComponent },
    // { path: '*', redirectTo: '/404' }
];

export const routing = RouterModule.forRoot(appRoutes);

