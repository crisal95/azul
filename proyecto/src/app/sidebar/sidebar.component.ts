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
 @Input() userData: UserData;
  user = '';

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.userService.statusChange.subscribe((userData: UserData) => {
      // console.log('userData', userData);
      if (userData) {

        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });

    if (this.userData == null) {
      this.userData = {
        userId: null,
        created: null,
        lastUpdate: null,
        email: null,
        userName: null,
        fullName: null,
        img: null,
        firstName: null,
        lastName: null
      };
    }
  }
}
