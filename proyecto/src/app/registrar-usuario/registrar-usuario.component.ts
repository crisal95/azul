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
  registerForm: FormGroup;
  constructor(
    private firebaseAuth: AngularFireAuth,
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: ['',  Validators.email],
      password: [''],
      userName: ['']
    });

  }


  ngOnInit() {

  }

  onSubmit() {
    this.firebaseAuth
      .createUserWithEmailAndPassword(
        this.registerForm.value.email,
        this.registerForm.value.password
      )
      .then(userData => {
        this.userService.setUserDataOnFirebase(userData.user.uid, this.registerForm, null);
        this.router.navigate(['home']);
      })
      .catch(error => {
        this.notificationService.showErrorMessage('Error creando el usuario', error.message);
      });
  }
}
