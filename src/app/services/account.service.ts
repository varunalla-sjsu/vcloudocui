import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { Observable,of } from 'rxjs';
import { account, Role } from '../models/account';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiEndpoint:string|undefined=process.env.NG_APP_API_URL;
  private laccount!: account;
  private loggedIn:boolean=false;
  constructor(private http:HttpClient) {
     Auth.currentSession();
    this.http.get<account>(this.apiEndpoint+'/user').subscribe((data)=>{
      this.laccount=data;
      this.loggedIn=true;
     });
  }
   getLoggedInUser(): Observable<account>{
     if(!this.loggedIn){
        return this.http.get<account>(this.apiEndpoint+'/user');
     }
     else
      return of(this.laccount);
  }
  helloWorld(){
    this.http.get(this.apiEndpoint+'/home').subscribe(data=>console.log(data),err=>console.log(err));
  }
  setUser(user:account){
    this.loggedIn=true;
    this.laccount=user;
  }
  isAuthenticated(): boolean{
    return true;
  }
  isAdmin(): boolean{
    return this.laccount.Role===Role.Admin;
  }
  clearUser(){
    this.loggedIn=false;
  }
}
