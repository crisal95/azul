import {Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input} from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireStorage} from '@angular/fire/storage';
import Chance from 'chance';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {
  @ViewChild('filePicker', {static: false}) filePickerRef: ElementRef<HTMLInputElement>;
  @Output() imagePick = new EventEmitter<string>();
  @Input() author = '';
  uploadTask: firebase.storage.UploadTask;
  fileUrl = '';
  uploadStatus = '';

  constructor(private firebaseStorage: AngularFireStorage) {}
  uploadedFileUrl = '';

  ngOnInit() {}

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

      const fileName = `postsImages/${this.generateRandomName()}.jpg`;

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
            this.imagePick.emit(downloadUrl);
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
}
