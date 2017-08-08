import { Routes, RouterModule } from '@angular/router';
import { ProjectListComponent } from "./projects/project_list.component";
import { ProjectDetailComponent } from "./projects/project_detail.component";


const appRoutes: Routes = [
    { path: '', component: ProjectListComponent },
    { path: 'projects', component: ProjectListComponent },
    { path: 'projects/:id', component: ProjectDetailComponent },
    // { path: '404', component: notFoundComponent },
    // { path: '*', redirectTo: '/404' }
];

export const routing = RouterModule.forRoot(appRoutes);

