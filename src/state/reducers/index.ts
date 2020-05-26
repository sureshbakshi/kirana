import { combineReducers, Reducer } from 'redux';
import {  IAppState} from '../../types/models';
import { connectRouter} from 'connected-react-router'
import notPersisteReducer from './not.persiste.reducer';
import appReducer from './app.reducer';
export interface IStoreState {
    notPersisteReducer: '',
    app: IAppState
}

type ReducerMaps = { [K in keyof IStoreState]: Reducer<any> };

const allReducers: ReducerMaps = {
    notPersisteReducer: notPersisteReducer,
    app:appReducer
};

// const rootReducer = (history) => combineReducers({  router: connectRouter(history), ...allReducers});

export default (history) => combineReducers({  ...allReducers, router: connectRouter(history)});