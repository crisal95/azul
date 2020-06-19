import {Component, OnInit, Input} from '@angular/core';
import {UserData} from '../shared/models';
import {AngularFireDatabase} from '@angular/fire/database';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {NotificationService} from '../shared/notification.service';

@Component({
  selector: 'app-content-wrapper',
  templateUrl: './content-wrapper.component.html',
  styleUrls: ['./content-wrapper.component.css']
})
export class ContentWrapperComponent implements OnInit {
  @Input() userData: UserData;
  @Input() isLoggedIn;
  usersList: UserData[] = [];
  inputForm: FormGroup;
   user: UserData;

  constructor(
    private firebaseDatabase: AngularFireDatabase,
    private formBuilder: FormBuilder,
    private router: Router,
    private notificationService: NotificationService
  ) {}

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
        followers: null,
        following: null
      };
    }

    this.firebaseDatabase
      .list(`users`, ref => ref.limitToLast(100).orderByChild('created'))
      .snapshotChanges()
      .subscribe(data => {
        //console.log(data);
        this.usersList = data.map(e => {
          return {
            ...(e.payload.val() as UserData)
          };
        });
      });

    this.inputForm = this.formBuilder.group({
      searchInput: ''
    });
  }
  onClick() {
    if (this.inputForm.value.searchInput != '') {
      const inputLowerCase = this.inputForm.value.searchInput.toString().toLowerCase();
      this.user = null;
      //caso nombre completo
      this.user = this.usersList.find(
        x => x.fullName.toLowerCase() === inputLowerCase
      );
      //caso nombre
      if (!this.user) {
         this.user = this.usersList.find(
          x => x.firstName.toLowerCase() === inputLowerCase
        );
        if (!this.user) {
           this.user = this.usersList.find(
            x => x.lastName.toLowerCase() === inputLowerCase
          );
          if(!this.user) {
            this.notificationService.showErrorMessage('Error en la busqueda', 'Usuario no encontrado!');
          }
        }
      }


      if(this.user){
        this.inputForm.reset;
        this.router.navigate(['/author'], {queryParams: {userId: this.user.userId}});
      }


    }
  }
}
