import React from 'react';
import ReactDOM from 'react-dom/client';
import Page1 from './Page1';
import'./index.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './Login';
import Groupchat from './Groupchat';
import { ContextProvider } from './Components/context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextProvider>
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page1 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/GroupChat" element={<Groupchat/>} />
      </Routes>
    </BrowserRouter>
    </ContextProvider>
  </React.StrictMode>
);


