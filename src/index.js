import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { useStrict } from 'mobx';

import { App } from './app';
import router from './router';

useStrict( true );

const rootEl = document.getElementById('root');
const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    rootEl
  );

render( App );
if ( module.hot ) module.hot.accept( './app', () => render( App ) );
