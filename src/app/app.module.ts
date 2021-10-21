import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UploadfileComponent } from './components/uploadfile/uploadfile.component';
import { AdminComponent } from './components/admin/admin.component';
import { FilelistComponent } from './components/filelist/filelist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MaterialModule } from './material/material.module';
import { LogoutBtnComponent } from './components/logout-btn/logout-btn.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxFileDropModule } from 'ngx-file-drop';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
//import { Amplify } from '@aws-amplify/core';
import {Amplify} from 'aws-amplify';
import {AmplifyConfig} from './config/aws-exports';
import { JwtInterceptor } from './jwt.interceptor';
import { FormsModule } from '@angular/forms';

import {FlexLayoutModule} from '@angular/flex-layout';
import { UpdateFileComponent } from './modals/update-file/update-file.component';
Amplify.configure(AmplifyConfig);
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UploadfileComponent,
    AdminComponent,
    FilelistComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LogoutBtnComponent,
    UpdateFileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxFileDropModule,
    HttpClientModule,
    AmplifyUIAngularModule,
    FormsModule,
    FlexLayoutModule
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
