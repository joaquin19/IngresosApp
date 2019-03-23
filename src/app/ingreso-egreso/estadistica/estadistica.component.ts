import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../ingreso-egreso.model';
import * as fromIngresoEgreso from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  ingresos: number;
  egresos: number;
  sumIngresos: number;
  sumEgresos: number;

  subscription: Subscription = new Subscription();

  public doughnutChartLabels: Array<string> = ['Ingresos', 'Egresos', 'Diferencias'];
  public colorBars: Array<any> = [
    {
      backgroundColor: '#DC1F1F'
    },
    {
      backgroundColor: '#EAF212'
    },
    {
      backgroundColor: '#3BE33B' || '#F29112' || '#3C9539'
    }
  ];
  public doughnutChartData: Array<number> = [];

  constructor(private  store: Store<fromIngresoEgreso.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('ingresoEgreso')
        .subscribe(ingresoEgreso => {
          this.sumIngresoEgreso(ingresoEgreso.items);
        });
  }

  sumIngresoEgreso(items: IngresoEgreso[]) {
    this.ingresos = 0;
    this.egresos = 0;
    this.sumIngresos = 0;
    this.sumEgresos = 0;

    items.forEach(item => {
      if (item.tipo === 'ingreso') {
        this.sumIngresos ++;
        this.ingresos += item.monto;
      } else {
        this.sumEgresos ++;
        this.egresos += item.monto;
      }
    });

    this.doughnutChartData = [ this.ingresos , this.egresos, this.ingresos - this.egresos];
  }


}
