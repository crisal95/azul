import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../shared/user.service';
import {Router} from '@angular/router';
import {NotificationService} from '../shared/notification.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService,
    private firebaseAuth: AngularFireAuth,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['']
    });
  }

  onSubmit() {
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(userData => {
        this.userService.performLogin(userData.user.uid);
        this.router.navigate(['/home']);
      })
      .catch(error => {
        this.notificationService.showErrorMessage('Error iniciando sesión', error.message);
      });


  }
}
