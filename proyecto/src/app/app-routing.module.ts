import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RouteGuard} from './shared/route-guard';
import {AuthorComponent} from './author/author.component';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';
import { RecuperarPasswordComponent } from './recuperar-password/recuperar-password.component';
import { RouteGuardLoggedIn } from './shared/route-guard-loggedIn'

export const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [RouteGuard]},
  {path: 'home', component: HomeComponent, canActivate: [RouteGuard]},
  {path: 'author', component: AuthorComponent, canActivate: [RouteGuard]},
  {path: 'login', component: LoginComponent, canActivate: [RouteGuardLoggedIn]},
  {path: 'registro', component: RegistrarUsuarioComponent, canActivate: [RouteGuardLoggedIn]},
  {path: 'recuperar-password', component: RecuperarPasswordComponent, canActivate: [RouteGuardLoggedIn]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
