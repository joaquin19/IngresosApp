import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

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
      console.log(resp);

      // es la ruta de cuando se crea la contraseña ingresa al dashboard
      this.router.navigate(['/']);
    })
    .catch( error => {
      console.error(error);
    });
  }

  loginUser( email: string, password: string) {
    this.angularFireAuth.auth
    .signInWithEmailAndPassword(email, password)
    .then(resp => {
      console.log(resp);

      this.router.navigate(['/']);
    })
    .catch(error => {
      console.error(error);
    });
  }
}
