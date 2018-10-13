

import * as fromUI from './shared/ui.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
   ui: fromUI.State;
}

// configuracion global de los reducers
//     el actionreducermap permite fucionar varios reducer en uno solo
export const appReducers: ActionReducerMap<AppState> = {
  ui: fromUI.uiReducer
};
