import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Game from './Game';

// The application will create a canvas element for you that you
// can then insert into the DOM
document.getElementById('view')!.appendChild(Game.view);

ReactDOM.render(<App />, document.getElementById('ui'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
