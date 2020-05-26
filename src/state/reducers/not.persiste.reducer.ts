
import produce from 'immer';

import { Actions } from '../actions/app.actions';

const initialState= {
}

const notPersisteReducer = (state = initialState, action: Actions) =>
  produce(state, (appState) => {
     
    });

export default notPersisteReducer;