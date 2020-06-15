import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {NotificationService} from '../shared/notification.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private firebaseAuth: AngularFireAuth,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['',  [Validators.email, Validators.required]]
    });
  }
  onSubmit() {
    this.firebaseAuth
      .sendPasswordResetEmail(this.registerForm.value.email)
      .then(userData => {
        this.router.navigate(['/login']);
        this.notificationService.showSuccessMessage('¡Ya casi estas de vuelta!', "Correo de recuperación enviado correctamente.");
      })
      .catch(error => {
        this.notificationService.showErrorMessage('Error iniciando sesión', error.message);
      });
  }
}
