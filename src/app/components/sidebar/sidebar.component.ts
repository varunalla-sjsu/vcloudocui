import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isAdmin: boolean;
  constructor(private accountService:AccountService) {
     this.isAdmin=this.accountService.isAdmin();
   }

  ngOnInit(): void {
  }

}
