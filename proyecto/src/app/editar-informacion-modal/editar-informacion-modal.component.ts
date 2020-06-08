import {Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input} from '@angular/core';
import * as firebase from 'firebase';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserService} from '../shared/user.service';
import {UserData} from '../shared/models';

@Component({
  selector: 'app-editar-informacion-modal',
  templateUrl: './editar-informacion-modal.component.html',
  styleUrls: ['./editar-informacion-modal.component.css']
})
export class EditarInformacionModalComponent implements OnInit {
  registerForm: FormGroup;
  uploadedFileUrl = '';
  @ViewChild('filePicker', {static: false}) filePickerRef: ElementRef<HTMLInputElement>;
  @Output() imagePick = new EventEmitter<string>();
  @Input() userData: UserData;
  user = '';
  uploadTask: firebase.storage.UploadTask;
  fileUrl = '';
  uploadStatus = '';


  constructor(
    private formBuilder: FormBuilder,
    private firebaseAuth: AngularFireAuth,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.minLength(1)],
      lastName: ['', Validators.minLength(1)],
      userName: ['', Validators.minLength(1)]
    });
    this.firebaseAuth.currentUser.then(userData => {
      if(userData){
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



  onSubmit(){
    this.userService.setUserDataOnFirebase(this.user,this.registerForm, this.fileUrl);
    window.location.reload();
  }
}
