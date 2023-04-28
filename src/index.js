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
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://us-east-1-shared-usea1-02.cdn.hygraph.com/content/clgyincet1u6l01um0ig492sn/master',
  cache: new InMemoryCache()
})



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Map" element={<MapApp />} />
        <Route path="/suggestions" element={<SubmitPage/>} />
      </Routes>  
    </BrowserRouter>
  </ApolloProvider>  

);
