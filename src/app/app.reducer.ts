

import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromIngresoEgresoReducer from './ingreso-egreso/ingreso-egreso.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
   ui: fromUI.State;
   auth: fromAuth.AuthState;
   ingresoEgreso: fromIngresoEgresoReducer.IngresoEgresoState;
}

// configuracion global de los reducers
//     el actionreducermap permite fucionar varios reducer en uno solo
export const appReducers: ActionReducerMap<AppState> = {
  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer,
  ingresoEgreso: fromIngresoEgresoReducer.IngresoEgresoReducer,
};
