import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from "./projects/projects.component";
import { ProjectComponent } from "./project/project.component";


const appRoutes: Routes = [
    { path: '', component: ProjectsComponent },
    { path: 'projects', component: ProjectsComponent },
    { path: 'project/:id', component: ProjectComponent },
    // { path: '404', component: notFoundComponent },
    // { path: '*', redirectTo: '/404' }
];

export const routing = RouterModule.forRoot(appRoutes);

