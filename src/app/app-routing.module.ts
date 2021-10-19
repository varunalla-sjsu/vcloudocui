import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './auth/admin.guard';
import { AuthGuard } from './auth/auth.guard';
import {AdminComponent} from './components/admin/admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UploadfileComponent } from './components/uploadfile/uploadfile.component';
const routes: Routes = [
  {path:'',redirectTo:'/dashboard', pathMatch:'full'},
  {path:'dashboard',component:DashboardComponent, canActivate:[AuthGuard]},
  {path:'uploadfile',component:UploadfileComponent, canActivate:[AuthGuard]},

  {path:'admin',component:AdminComponent, canActivate:[AuthGuard,AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
