import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from './components/admin/admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UploadfileComponent } from './components/uploadfile/uploadfile.component';
const routes: Routes = [
  {path:'',redirectTo:'/dashboard', pathMatch:'full'},
  {path:'dashboard',component:DashboardComponent},
  {path:'uploadfile',component:UploadfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
