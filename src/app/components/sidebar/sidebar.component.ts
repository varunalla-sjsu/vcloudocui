import { Component, OnInit } from '@angular/core';
import { account, Role } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isAdmin: boolean=false;
  user!:account;
  constructor(private accountService:AccountService) {
   }

  async ngOnInit(): Promise<void> {
    this.user=await this.accountService.getLoggedInUser().toPromise();
    if(this.user.Role==Role.Admin){
      this.isAdmin=true;
    }
  }

}
