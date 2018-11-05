import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private afDB: AngularFirestore,
              public authService: AuthService) { }

  crearIngresoegreso( ingresoEgreso: IngresoEgreso) {

    const user = this.authService.getUser();

    this.afDB.doc(`${user.uid}/ingresos-egreso`)
        .collection('itens').add({...ingresoEgreso})
        .then()
        .catch(err => {
          console.log(err);
        });
  }
}
