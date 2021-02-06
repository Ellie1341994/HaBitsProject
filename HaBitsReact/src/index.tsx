import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

declare namespace JSX {
  interface IntrinsicElements {
      element: any;
  }
}

const title:string = "HaBits";
const element = <h1 className="bg-red-100">Welcome to {title}</h1>;

ReactDOM.render(
  <React.StrictMode>
    <App />,
      {element}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
