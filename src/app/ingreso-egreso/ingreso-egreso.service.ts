import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction, UnsetItemsAction } from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  initIngresoEgresoListenerSubs: Subscription = new Subscription();
  ingresoEgresoItemsSubs: Subscription = new Subscription();


  constructor(
    private afDB: AngularFirestore,
    public authService: AuthService,
    private store: Store<AppState>,
  ) { }

  initIngresoEgresoListener() {

    this.initIngresoEgresoListenerSubs = this.store.select('auth').pipe(
      filter(auth => auth.user !== null)
      )
    .subscribe(auth => this.ingresoEgresoItems(auth.user.uid));
  }

  private ingresoEgresoItems(uid: string) {
    this.ingresoEgresoItemsSubs = this.afDB.collection(`${uid}/ingresos-egreso/items`)
        .snapshotChanges().pipe(
          map(docData => {
            return docData.map(doc => {
              return {
                uid: doc.payload.doc.id,
                ...doc.payload.doc.data()
              };
            });
          })
        )
        .subscribe((collection: any[]) => {
          this.store.dispatch(new SetItemsAction(collection));
        });
  }

  cancelSubscriptions() {
    this.initIngresoEgresoListenerSubs.unsubscribe();
    this.ingresoEgresoItemsSubs.unsubscribe();
    this.store.dispatch(new UnsetItemsAction());
  }

  crearIngresoegreso( ingresoEgreso: IngresoEgreso) {

    const user = this.authService.getUser();

    return this.afDB.doc(`${user.uid}/ingresos-egreso`)
        .collection('items').add({...ingresoEgreso});
  }

  deleteIngresoEgreso(uid: string) {
    const user = this.authService.getUser();
    return this.afDB.doc(`${user.uid}/ingresos-egreso/items/${uid}`)
             .delete();
  }
}
