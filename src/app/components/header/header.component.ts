import { Component, OnInit } from '@angular/core';
import { account } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user!:account;
  constructor(private accountService:AccountService) { }

  async ngOnInit(): Promise<void> {
    let user= await this.accountService.getLoggedInUser().toPromise();
  }

}
