import {applyMiddleware, compose, createStore} from 'redux'
import {routerMiddleware} from 'connected-react-router'
import thunk from 'redux-thunk';
import createRootReducer from '../reducers'

const createBrowserHistory = require('history').createBrowserHistory;


export const history = createBrowserHistory({ basename: "/idl" });

const routeMiddleware = routerMiddleware(history);

const middlewares = [thunk, routeMiddleware];


export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        ...middlewares
      ),
      //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );

  return store;
}
