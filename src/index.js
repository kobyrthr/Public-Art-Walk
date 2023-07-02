import React from 'react';
import ReactDOM from 'react-dom/client';
import 'mapbox-gl/dist/mapbox-gl.css';
// import './normalize.css';
// import './skeleton.css';
import './index.css';
import LandingPage from './Pages/LandingPage';
import MapPage from './Pages/MapPage';
import SubmitPage from './Pages/Submit page';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ChakraProvider } from '@chakra-ui/react'


const client = new ApolloClient({
  uri: 'https://us-east-1-shared-usea1-02.cdn.hygraph.com/content/clgyincet1u6l01um0ig492sn/master',
  cache: new InMemoryCache()
})



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Map" element={<MapPage />} />
        <Route path="/suggestions" element={<SubmitPage/>} />
      </Routes>  
    </BrowserRouter>
  </ApolloProvider>  

);
