import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './styles/index.css';
import App from './router';

render((
    <BrowserRouter>
        <App/>
    </BrowserRouter>
), document.getElementById('root'));
