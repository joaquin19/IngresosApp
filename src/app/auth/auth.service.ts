import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { map } from 'rxjs/operators';

// colocando alerta dinamica
import Swal from 'sweetalert2';
import { User } from './user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivatedLoadingAction, DesactivatedLoadingAction } from '../shared/ui.accions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private angularFireAuth: AngularFireAuth,
               private router: Router,
               private afDB: AngularFirestore,
               private store: Store<AppState> ) { }


  // verifica la authenticacion del usuario que logea o se registra
  initAuthListener() {
    this.angularFireAuth.authState.subscribe( (fbUser: firebase.User) => {
    });
  }

  createUser( name: string, email: string, password: string) {

    this.store.dispatch( new ActivatedLoadingAction() );

    this.angularFireAuth.auth
    .createUserWithEmailAndPassword(email, password)
    .then( resp => {

      const user: User = {
        uid: resp.user.uid,
        name: name,
        email: resp.user.email
      };

      this.afDB.doc(`${ user.uid }/usuario`)
      .set(user)
      .then(() => {
        // es la ruta de cuando se crea la contraseña ingresa al dashboard
        this.router.navigate(['/']);
        this.store.dispatch( new DesactivatedLoadingAction());
      });

    })
    .catch( error => {
      this.store.dispatch(new DesactivatedLoadingAction());
      Swal('Error al crear usuario', error.message, 'error');
    });
  }

  loginUser( email: string, password: string) {

    this.store.dispatch(new ActivatedLoadingAction());

    this.angularFireAuth.auth
    .signInWithEmailAndPassword(email, password)
    .then(resp => {

      // es la ruta al logear con el correo corecto
      this.router.navigate(['/']);
      this.store.dispatch(new DesactivatedLoadingAction());
    })
    .catch(error => {
      this.store.dispatch(new DesactivatedLoadingAction());
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
