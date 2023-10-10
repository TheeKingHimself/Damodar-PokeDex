import React from 'react';
import ReactDOM from 'react-dom'; // Fixed this import
import './index.css';
import Root from './components/Root';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Root /> {/* Only render the Root component */}
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
