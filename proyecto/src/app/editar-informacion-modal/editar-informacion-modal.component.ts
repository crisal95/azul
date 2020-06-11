import {Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input} from '@angular/core';
import * as firebase from 'firebase';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserService} from '../shared/user.service';
import {UserData} from '../shared/models';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-editar-informacion-modal',
  templateUrl: './editar-informacion-modal.component.html',
  styleUrls: ['./editar-informacion-modal.component.css']
})
export class EditarInformacionModalComponent implements OnInit {
  registerForm: FormGroup;
  passwordForm: FormGroup;
  uploadedFileUrl = '';
  @ViewChild('filePicker', {static: false}) filePickerRef: ElementRef<HTMLInputElement>;
  @Output() imagePick = new EventEmitter<string>();
  @Input() userData: UserData;
  user = '';
  uploadTask: firebase.storage.UploadTask;
  fileUrl = '';
  uploadStatus = '';
  changingPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private firebaseAuth: AngularFireAuth,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.minLength(1)],
      lastName: ['', Validators.minLength(1)],
      userName: ['', Validators.minLength(1)]
    });

    this.passwordForm = this.formBuilder.group({
      newPassword: ['', Validators.required]
    });
    this.firebaseAuth.currentUser.then(userData => {
      if (userData) {
        this.user = userData.uid;
      }
    });

    if (this.userData) {
      this.registerForm.setValue({
        firstName: this.userData.firstName,
        lastName: this.userData.lastName,
        userName: this.userData.userName
      });
      this.fileUrl = this.userData.img;
    }
  }

  onImagePicked(imageUrl: string) {
    console.log('url en firebase listo para guardar en la base de datos', imageUrl);
    this.fileUrl = imageUrl;
  }

  onSubmit() {
    this.userService.setUserDataOnFirebase(this.user, this.registerForm, this.fileUrl);
    window.location.reload();
  }

  onSubmitPassword() {
    firebase
      .auth()
      .currentUser.updatePassword(this.passwordForm.value.newPassword)
      .then(userData => {
        this.notificationService.showSuccessMessage('Genial!', 'Tu contraseña ha sido cambiada con exito!');

      })
      .catch( error => {
        this.notificationService.showErrorMessage('Error al intentar cambiar tu contraseña :(', error);
      });
  }
}
