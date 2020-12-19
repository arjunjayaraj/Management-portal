import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectComponent } from './project/project.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';

const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'user', component: UserComponent},
  { path: 'user/add', component: UserDetailComponent},
  { path: 'user/edit/:id', component: UserDetailComponent},
  { path: 'project', component: ProjectComponent},
  { path: 'project/add', component: ProjectDetailComponent},
  { path: 'project/edit/:id', component: ProjectDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
