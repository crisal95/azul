import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {UserService} from '../shared/user.service';
import {NotificationService} from '../shared/notification.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {
  registerUserForm: FormGroup;
  constructor(
    private firebaseAuth: AngularFireAuth,
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder
  ) {

  }


  ngOnInit() {
    this.registerUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['',  [Validators.email, Validators.required]],
      password: [''],
      userName: ['', Validators.required]
    });
  }

  onSubmit() {
    this.firebaseAuth
      .createUserWithEmailAndPassword(
        this.registerUserForm.value.email,
        this.registerUserForm.value.password
      )
      .then(userData => {
        this.userService.setUserDataOnFirebase(userData.user.uid, this.registerUserForm, null, null);
        this.router.navigate(['home']);
      })
      .catch(error => {
        this.notificationService.showErrorMessage('Error creando el usuario', error.message);
      });
  }
}
