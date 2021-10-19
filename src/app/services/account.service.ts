import { Injectable } from '@angular/core';
import { account, Role } from '../models/account';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor() { }
  getLoggedInUser(): account{
    return {firstName:'',lastName:'',username:'',userId:'',userRole:Role.User,isActive:false};
  }
}
