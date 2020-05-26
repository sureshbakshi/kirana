
import produce from 'immer';

import { IAppState } from '../../types/models';
import { Actions, AppActionTypes } from '../actions/app.actions';

const initialState: IAppState = {
    enableChallange: false
}

const appReducer = (state = initialState, action: Actions) =>
  produce(state, (appState: IAppState) => {
      switch(action.type) {
          case AppActionTypes.ENABLE_CHALLANGE:
            appState.enableChallange = action.payload;
            break;
      }
    });

export default appReducer;