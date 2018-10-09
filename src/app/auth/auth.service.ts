import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private angularFireAuth: AngularFireAuth ) { }

  createUser( name: string, email: string, password: string) {

    this.angularFireAuth.auth
    .createUserWithEmailAndPassword(email, password)
    .then( resp => {
      console.log(resp);
    })
    .catch( error => {
      console.error(error);
    });
  }
}
