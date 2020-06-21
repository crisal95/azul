import {Component, OnInit, Input} from '@angular/core';
import {UserData} from '../shared/models';

@Component({
  selector: 'app-content-wrapper',
  templateUrl: './content-wrapper.component.html',
  styleUrls: ['./content-wrapper.component.css']
})
export class ContentWrapperComponent implements OnInit {
  @Input() userData: UserData;
  @Input() isLoggedIn;

  constructor() {}

  ngOnInit() {
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
        lastName: null,
        following: null
      };
    }
  }
}
