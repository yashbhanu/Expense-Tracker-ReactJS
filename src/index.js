import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from './context/context';
import { SpeechProvider } from '@speechly/react-client';

//wrapped the whole application inside the the speechly class and passed appId and language to it
ReactDOM.render(
  <SpeechProvider appId="d577fedc-d29e-49a3-8e5b-3a84ed824123" language="en-US">
    <Provider>
      <App />
    </Provider>
  </SpeechProvider>
,document.getElementById('root'),
);

