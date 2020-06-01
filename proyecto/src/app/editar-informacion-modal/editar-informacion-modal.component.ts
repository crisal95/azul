import {Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input} from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireStorage} from '@angular/fire/storage';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Chance from 'chance';
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
    private firebaseStorage: AngularFireStorage,
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
      this.user = userData.uid;
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
    this.uploadedFileUrl = imageUrl;
  }

  onUploadImage() {
    // Forzar un click en el campo input para mostrar el dialogo del S.O. para subir archivos
    this.filePickerRef.nativeElement.click();
    return;
  }

  onFileChosen(event) {
    const fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      const file: File = fileList[0];

      const fileName = `profilePictures/${this.user}/${this.generateRandomName()}.jpg`;

      const storageRef = this.firebaseStorage.storage.ref();
      this.uploadTask = storageRef.child(fileName).put(file);

      this.uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          // Upload en progreso, calculamos el porcentaje de completitud
          this.uploadStatus =
            ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toString() + '%';
        },
        error => {
          // Error al hacer upload
          console.log(error);
        },
        () => {
          this.uploadTask.snapshot.ref.getDownloadURL().then(downloadUrl => {
            this.uploadStatus = '';
            this.fileUrl = downloadUrl;
          });
        }
      );
    }
  }

  generateRandomName() {
    const chance = new Chance();
    const text = chance.string({length: 8, casing: 'upper', alpha: true, numeric: true});

    return text;
  }

  onSubmit(){
    this.userService.modifyUserDataOnFirebase(this.user,this.registerForm);
  }
}
