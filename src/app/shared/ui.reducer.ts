import * as fromUI from './ui.accions';

export interface State {
  isLoading: boolean;
}

const initsatte: State = {
  isLoading: false
};

export function uiReducer( state = initsatte, action: fromUI.accions): State {

  switch (action.type) {

    case fromUI.ACTIVATE_LOADING:
      return {
        isLoading: true
      };

    case fromUI.DESACTIVATED_LOADING:
      return {
        isLoading: false
      };

    default:
      return state;
  }
}


