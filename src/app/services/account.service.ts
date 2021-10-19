import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { account, Role } from '../models/account';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  laccount: account={firstName:'Varun',lastName:'Alla',username:'varunalla',userId:'1000',userRole:Role.User,isActive:false};
  constructor(private http:HttpClient) { }
  getLoggedInUser(): account{
    return this.laccount;
  }
  isAuthenticated(): boolean{
    return true;
  }
  isAdmin(): boolean{
    return this.laccount.userRole===Role.Admin;
  }
}
