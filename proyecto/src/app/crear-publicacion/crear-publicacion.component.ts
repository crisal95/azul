import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../shared/post.service';
import {NotificationService} from '../shared/notification.service';
import {SpinnerService} from '../shared/spinner.service';
import {UserService} from '../shared/user.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-crear-publicacion',
  templateUrl: './crear-publicacion.component.html',
  styleUrls: ['./crear-publicacion.component.css']
})
export class CrearPublicacionComponent implements OnInit {
  publicacionForm: FormGroup;
  uploadedFileUrl = '';
  @Input() boolModal;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private notificationServie: NotificationService,
    private spinnerService: SpinnerService,
    private userService: UserService,
    private firebaseAuth: AngularFireAuth
  ) {
    this.publicacionForm = this.formBuilder.group({
      texto: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.firebaseAuth.currentUser
      .then(authData => {
        this.userService.getUserDataFromFirebase(authData.uid).then(userData => {
          this.postService
            .addNewPostAsync(this.publicacionForm.value.texto, this.uploadedFileUrl)
            .then(results => {
              this.notificationServie.showSuccessMessage('Genial!', 'Publicación Creada exitosamente');
              // this.posts = this.postService.getAllPosts();
              this.spinnerService.hideMainSpinner();
              this.publicacionForm.reset();
              this.uploadedFileUrl = "";
            })
            .catch(error => {
              this.notificationServie.showErrorMessage('Error!!!', 'Error creando publicación');
              this.spinnerService.hideMainSpinner();
            });
        });
      })
      .catch(err => {
        this.spinnerService.hideMainSpinner();
        this.notificationServie.showErrorMessage('Error', err);
      });
  }
  onImagePicked(imageUrl: string) {
    console.log('url en firebase listo para guardar en la base de datos', imageUrl);
    this.uploadedFileUrl = imageUrl;
  }
}
