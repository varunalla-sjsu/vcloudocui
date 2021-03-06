import { Component,ChangeDetectorRef, NgZone } from '@angular/core';
import { onAuthUIStateChange, CognitoUserInterface, AuthState, FormFieldTypes } from '@aws-amplify/ui-components';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vcloudoc-ui';
  user: CognitoUserInterface | undefined;
  authState: AuthState=AuthState.Loading;
  formFields: FormFieldTypes;
  constructor(private ref: ChangeDetectorRef,private ngZone:NgZone,private accountService:AccountService) {
    this.formFields = [
      { type: "username" },
      { type: "password" },
      {type:"given_name", label:'First Name',required:true,placeholder: 'First name',},
      {type:"family_name",label:'Last Name',required:true,placeholder: 'Last name'},
      { type: "email" }
    ];
  }
  ngOnInit() {
    
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      if(this.authState==AuthState.SignedOut){
        this.accountService.clearUser();
      }
      this.ngZone.run(()=>this.ref.detectChanges()) ;
    })
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}
