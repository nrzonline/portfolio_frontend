import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from "./projects/projects.component";

const appRoutes: Routes = [
    { path: '', component: ProjectsComponent },
    // { path: '404', component: notFoundComponent },
    // { path: '*', redirectTo: '/404' }
];

export const routing = RouterModule.forRoot(appRoutes);