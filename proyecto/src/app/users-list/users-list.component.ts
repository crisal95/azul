import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  @Input() listType: String;

  constructor() {}

  ngOnInit() {}
}
