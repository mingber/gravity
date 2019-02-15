import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './index.css';

import registerServiceWorker from './registerServiceWorker';

import Gravity from './gravity/components/Gravity';
import gravityReducer from './gravity/reducer';

import Snake from './snake/components/Game';
import snakeReducer from './snake/reducer';

injectTapEventPlugin();

const reducer = combineReducers({
  gravity: gravityReducer,
  snake: snakeReducer,
});

const store = createStore(reducer);

const App = () => (
  <div className="container">
    <Route path="/gravity" component={Gravity} />
    <Route path="/snake" component={Snake} />
  </div>
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
