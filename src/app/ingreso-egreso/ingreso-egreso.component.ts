import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit {

  form: FormGroup;
  tipo = 'ingreso';

  constructor(public ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {

    this.form = new FormGroup({
      'descripcion': new FormControl('', Validators.required),
      'monto': new FormControl(0, Validators.min(0))
    });
  }

  creatIngresoEgreso() {

    const ingresoEgreso = new IngresoEgreso({
      ...this.form.value, tipo: this.tipo });

      this.ingresoEgresoService.crearIngresoegreso(ingresoEgreso);
  }

}
