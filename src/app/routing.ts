import { Routes, RouterModule } from '@angular/router';

import { ProjectListComponent, ProjectDetailComponent } from './projects/index';
import { SkillListComponent, SkillDetailComponent } from './skills/index';
import { AboutComponent } from './about/index';
import { ContactComponent } from './contact/index';


const appRoutes: Routes = [
    { path: '', redirectTo: 'projects', pathMatch: 'full' },
    
    { path: 'projects', component: ProjectListComponent },
    { path: 'projects/:id', component: ProjectDetailComponent },
    { path: 'projects/:id/:slug', component: ProjectDetailComponent },

    { path: 'skills', component: SkillListComponent },
    { path: 'skills/:id', component: SkillDetailComponent },
    { path: 'skills/:id/:slug', component: SkillDetailComponent },

    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    
    { path: '**', redirectTo: 'projects' }
    // { path: '404', component: notFoundComponent },
];

export const routing = RouterModule.forRoot(appRoutes);

