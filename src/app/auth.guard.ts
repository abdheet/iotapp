import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../app/shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService, 
    private router: Router) { }
 
  canActivate(){
    if(this.authService.isLoggedIn()){
      return true;
    }
      window.open('http://my-first-unique-aws-bucket.s3-website.us-east-2.amazonaws.com/','_self')
    // return this.router.navigateByUrl('/home');
  }
//   // canActivate(
//   //   next: ActivatedRouteSnapshot,
//   //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//   //   return true;
//   // }
  
 }
