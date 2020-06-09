import {Component, OnInit} from '@angular/core';
import {UserService} from './shared/user.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BlueTweet';
  prueba(nombre: string) {
    // return 'hola ' + nombre;
    return `hola ${nombre}`;
  }

  constructor(private userService: UserService, private firebaseAuth: AngularFireAuth) {}

  ngOnInit(): void {
    // Revise en firebase si el usuario cambio su estado de autenticacion
    // paso de logout a logged in o inverso
    this.firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        this.userService.performLogin(user.uid);
      } else {
        this.userService.performLogout();
      }
    });
  }
}
