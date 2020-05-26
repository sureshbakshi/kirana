import { routerMiddleware } from 'connected-react-router'
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddlware from 'redux-saga';
import createRootReducer from '../state/reducers';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createBrowserHistory } from "history";
const history = createBrowserHistory();


const persistConfig = {
    key: 'root',
    storage,
}
const sagaMiddleware = createSagaMiddlware();
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const getAppliedMiddleware = (routerhistory: any) => {
    if (process.env.NODE_ENV === 'development') {
        return applyMiddleware(
            sagaMiddleware,
            routerMiddleware(routerhistory),
            createLogger(),
        );
    }
    return applyMiddleware(
        sagaMiddleware,
        routerMiddleware(routerhistory),
        createLogger(),
    )
}


export const STORE = createStore(
        persistReducer(persistConfig, createRootReducer(history)),
        {},
        composeEnhancers(
            getAppliedMiddleware(history),
        ),
    );


