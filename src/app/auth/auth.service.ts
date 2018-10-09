import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

// colocando alerta dinamica
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private angularFireAuth: AngularFireAuth,
               private router: Router ) { }

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
}
