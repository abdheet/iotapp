import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {config }  from '../shared/config'
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { Token } from '../shared/token';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;
  public helper = new JwtHelperService();

  constructor() { }
  
  // login(user: { username: string, userpassword: string }): Observable<boolean> {
  //   return this.http.post<any>(`${config.apiUrl}/login`, user)
  //     .pipe(
  //       tap(tokens => this.doLoginUser(user.username, tokens)),
  //       mapTo(true),
  //       catchError(error => {
        
  //         return of(false);
  //       }));
  // }

  // logout() {
  //   return this.http.post<any>(`${config.apiUrl}/logout`, {
  //     'RefreshToken': this.getRefreshToken(),
  //     'JWTToken' : this.getJwtToken(),

  //   }).pipe(
  //     tap(() => this.doLogoutUser()),
  //     mapTo(true),
  //     catchError(error => {
      
  //       return of(false);
  //     }));
  // // }
  public getUser(){
    if(this.isLoggedIn()){
      return this.helper.decodeToken(localStorage.getItem("token"));
    }
  }
  isLoggedIn() {

   console.log(localStorage.getItem("token"))
     return !!localStorage.getItem("token");
  }

  // refreshToken() {
  //   return this.http.post<any>(`${config.apiUrl}/refresh`, {
  //     'refreshToken': this.getRefreshToken()
  //   }).pipe(tap((tokens: Token) => {
  //     this.storeJwtToken(tokens.JWTToken);
  //   }));
  // }

  // getJwtToken() {
  //   return localStorage.getItem(this.JWT_TOKEN);
  // }

  // private doLoginUser(username: string, tokens: Token) {
  //   this.loggedUser = username;
  //   this.storeTokens(tokens);
  // }

  // private doLogoutUser() {
  //   this.loggedUser = null;
  //   this.removeTokens();
  // }

  // private getRefreshToken() {
  //   return localStorage.getItem(this.REFRESH_TOKEN);
  // }

  // private storeJwtToken(jwt: string) {
  //   localStorage.setItem(this.JWT_TOKEN, jwt);
  // }

  // private storeTokens(tokens: Token) {
  //   localStorage.setItem(this.JWT_TOKEN, tokens.JWTToken);
  //   localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  // }

  // private removeTokens() {
  //   localStorage.removeItem(this.JWT_TOKEN);
  //   localStorage.removeItem(this.REFRESH_TOKEN);
  // }
}
