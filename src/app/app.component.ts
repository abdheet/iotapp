import { Component } from '@angular/core';
import { tokenName } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(){
  //localStorage.setItem('token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1OTg5NjAyNjcsIm5iZiI6MTU5ODk2MDI2NywianRpIjoiYjZkYWMyOWMtY2FmYS00OGI5LWE2ZmYtMDY3MWMxMDVkYzk1IiwiZXhwIjoxNTk4OTYxMTY3LCJpZGVudGl0eSI6ImJoYXJ0aUBnbWFpbC5jb20iLCJmcmVzaCI6OCwidHlwZSI6ImFjY2VzcyJ9.LqRC7P2U2QtYZJHWuiORc4Cp0mDqzAWJY8BWWAGQO3s")
  }
  
  title = 'IoT-new';
}
