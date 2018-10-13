import { Action } from '@ngrx/store';

export const ACTIVATE_LOADING = '[UI Loading] Cargando...';
export const DESACTIVATED_LOADING = '[UI loading] Cargando...';

export class ActivatedLoadingAction implements Action {
  readonly type = ACTIVATE_LOADING;
}

export class  DesactivatedLoadingAction implements Action {
  readonly type = DESACTIVATED_LOADING;
}

export type accions = ActivatedLoadingAction |
                      DesactivatedLoadingAction;
