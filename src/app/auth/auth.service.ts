import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { map } from 'rxjs/operators';

// colocando alerta dinamica
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private angularFireAuth: AngularFireAuth,
               private router: Router ) { }


  // verifica la authenticacion del usuario que logea o se registra
  initAuthListener() {
    this.angularFireAuth.authState.subscribe( (fbUser: firebase.User) => {
      console.log(fbUser);
    });
  }

  createUser( name: string, email: string, password: string) {

    this.angularFireAuth.auth
    .createUserWithEmailAndPassword(email, password)
    .then( resp => {

      // es la ruta de cuando se crea la contraseña ingresa al dashboard
      this.router.navigate(['/']);
    })
    .catch( error => {
      Swal('Error al crear usuario', error.message, 'error');
    });
  }

  loginUser( email: string, password: string) {
    this.angularFireAuth.auth
    .signInWithEmailAndPassword(email, password)
    .then(resp => {

      // es la ruta al logear con el correo corecto
      this.router.navigate(['/']);
    })
    .catch(error => {
      Swal('Error en el login', error.message, 'error');
    });
  }

  logout() {

    this.router.navigate(['/login']);
    this.angularFireAuth.auth.signOut();
  }

  isAuth() {
    return this.angularFireAuth.authState.pipe(
      map( fbUser => {
        if ( fbUser === null) {
          this.router.navigate(['/login']);
        }
        return fbUser != null;
      })
    );
  }
}
