import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './scss/base/normalize.scss';
import './scss/base/base.scss';
import { Provider } from 'react-redux';
import { store } from './store';

import { App } from './components/app';
import { ErrorBoundry } from './components/error-boundry';
import { ShowplaceService } from './services/showplaces-service';
import { Context } from './components/showplace-service-context';

import './scss/owfont-regular.min.scss';

const showplaceService = new ShowplaceService();

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundry>
        <Context.Provider value={showplaceService}>
          <App />
        </Context.Provider>
      </ErrorBoundry>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
