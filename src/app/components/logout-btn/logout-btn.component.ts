import { Component, Input, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { account, Role } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-logout-btn',
  templateUrl: './logout-btn.component.html',
  styleUrls: ['./logout-btn.component.css']
})
export class LogoutBtnComponent implements OnInit {
  user!:account;
  constructor(private accountService:AccountService) { }

  async ngOnInit(): Promise<void> {
    this.user=await this.accountService.getLoggedInUser().toPromise(); 
  }
  logout(){
    this.accountService.clearUser();
    Auth.signOut({global:true});
    location.reload();
  }
}
