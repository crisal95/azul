import {Component, OnInit, Input} from '@angular/core';
import {UserData} from '../shared/models';
import {UserService} from '../shared/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isLoggedIn = false;
  userData: UserData;

  constructor(private userService: UserService) {}

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
