import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ActivatedLoadingAction, DesactivatedLoadingAction } from '../shared/ui.accions';
import * as fromIngresoEgreso from '../ingreso-egreso/ingreso-egreso.reducer';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  form: FormGroup;
  tipo = 'ingreso';

  loading: Subscription = new Subscription();
  load: boolean;

  constructor(
    public ingresoEgresoService: IngresoEgresoService,
    private store: Store<fromIngresoEgreso.AppState>
    ) { }

  ngOnInit() {

    this.loading = this.store.select('ui')
                       .subscribe(ui => this.load = ui.isLoading);

    this.form = new FormGroup({
      'descripcion': new FormControl('', Validators.required),
      'monto': new FormControl(0, Validators.min(0))
    });
  }

  ngOnDestroy() {
    this.loading.unsubscribe();
  }

  creatIngresoEgreso() {

    this.store.dispatch(new ActivatedLoadingAction());

    const ingresoEgreso = new IngresoEgreso({
      ...this.form.value, tipo: this.tipo });

      this.ingresoEgresoService.crearIngresoegreso(ingresoEgreso)
              .then(() => {

                this.store.dispatch(new DesactivatedLoadingAction());
                swal('Creado', ingresoEgreso.descripcion, 'success');
                this.form.reset({ monto: 0 });
              });

  }

}
