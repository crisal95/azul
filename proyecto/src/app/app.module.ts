import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserService} from './shared/user.service';
import {RouteGuard} from './shared/route-guard';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {NotificationService} from './shared/notification.service';
import {PostService} from './shared/post.service';
import {NgxSpinnerModule} from 'ngx-spinner';
import {SpinnerService} from './shared/spinner.service';
import {AuthorComponent} from './author/author.component';
import {NotificationComponent} from './notification/notification.component';
import {FileUploaderComponent} from './file-uploader/file-uploader.component';

import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {environment} from '../environments/environment';
import { EditarInformacionModalComponent } from './editar-informacion-modal/editar-informacion-modal.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { ContentWrapperComponent } from './content-wrapper/content-wrapper.component';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';
import { CrearPublicacionComponent } from './crear-publicacion/crear-publicacion.component';
import { PublicacionComponent } from './publicacion/publicacion.component';
import { RecuperarPasswordComponent } from './recuperar-password/recuperar-password.component';
import { UsersListComponent } from './users-list/users-list.component';
import {AngularFirePerformanceModule} from '@angular/fire/performance';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AuthorComponent,
    NotificationComponent,
    FileUploaderComponent,
    EditarInformacionModalComponent,
    SidebarComponent,
    WrapperComponent,
    ContentWrapperComponent,
    RegistrarUsuarioComponent,
    CrearPublicacionComponent,
    PublicacionComponent,
    RecuperarPasswordComponent,
    UsersListComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirePerformanceModule
  ],
  providers: [UserService, RouteGuard, NotificationService, PostService, SpinnerService],
  bootstrap: [AppComponent]
})
export class AppModule {}
