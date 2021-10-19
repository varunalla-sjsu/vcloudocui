import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { account, Role } from '../models/account';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) { }
  getLoggedInUser(): account{
    return {firstName:'',lastName:'',username:'',userId:'',userRole:Role.User,isActive:false};
  }
  isAuthenticated(): boolean{
    return true;
  }
  isAdmin(): boolean{
    return false;
  }
}
