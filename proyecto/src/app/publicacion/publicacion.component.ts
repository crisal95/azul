import {Component, OnInit, Input} from '@angular/core';
import {UserData, PostData} from '../shared/models';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {
  @Input() userData: UserData;
  @Input() postData: PostData;

  constructor() {
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
        followers: null,
        following: null
      };
    }
    if (this.postData == null) {
      this.postData = {
        created: null,
        img: null,
        content: null,
        key: null,
        creationDate: null,
        userId: null
      };
    }
  }

  ngOnInit() {}
}
