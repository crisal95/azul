import {Component, OnInit, Input} from '@angular/core';
import {UserData} from '../shared/models';

@Component({
  selector: 'app-content-wrapper',
  templateUrl: './content-wrapper.component.html',
  styleUrls: ['./content-wrapper.component.css']
})
export class ContentWrapperComponent implements OnInit {
  @Input() userData: UserData;

  constructor() {}

  ngOnInit() {
    if (this.userData == null) {
      this.userData = {
        created: null,
        lastUpdate: null,
        email: null,
        userName: null,
        fullName: null,
        img: null
      };
    }
  }
}
