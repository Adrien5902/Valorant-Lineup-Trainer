import React from 'react';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
);