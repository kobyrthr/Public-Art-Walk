import React from 'react';
import ReactDOM from 'react-dom/client';
import 'mapbox-gl/dist/mapbox-gl.css';
import './normalize.css';
import './skeleton.css';
import './index.css';
import Home from './Pages/Home';
import MapApp from './Pages/App';
import SubmitPage from './Pages/Submit page';
import { BrowserRouter, Routes, Route } from "react-router-dom";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Map" element={<MapApp />} />
      <Route path="/suggestions" element={<SubmitPage/>} />
    </Routes>  
  </BrowserRouter>
);
