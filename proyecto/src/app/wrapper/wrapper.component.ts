import { Component, OnInit } from '@angular/core';
import { UserData } from '../shared/models';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent implements OnInit {
  isLoggedIn = false;
  userData: UserData;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.statusChange.subscribe((userData: UserData) => {
      // console.log('userData', userData);
      if (userData) {
        this.userData = userData;
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

}
