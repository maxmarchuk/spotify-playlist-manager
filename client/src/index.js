import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

// Font awesome stuff
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faFastForward,
  faFastBackward,
  faPlay,
  faPause,
  faAngleDown,
  faAngleUp,
  faHome
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faFastForward,
  faFastBackward,
  faPlay,
  faPause,
  faAngleDown,
  faAngleUp,
  faHome
);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
