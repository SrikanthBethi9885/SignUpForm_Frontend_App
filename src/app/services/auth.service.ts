
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  baseServerURL="https://localhost:44397/api/";
  registerUser(user:Array<any>){
    return this.http.post(this.baseServerURL+"User/CreateUser",{
      FirstName: user[0],
      LastName:user[1],
      Email:user[2],
      Mobile:user[3],
      Gender:user[4],
      Pwd:user[5]
    },{responseType:'text'});
  }
  loginUser(loginInfo:Array<any>){
    return this.http.post(this.baseServerURL+"User/LoginUser",{
      Email:loginInfo[0],
      Pwd:loginInfo[1]
    },{
      responseType:'text'
    })
  }
}
