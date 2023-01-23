import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import LoginPage from './pages/LoginPage/LoginPage';
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path={ ['/', '/login'] } component={ LoginPage } />
      <Route path="/products" component={ ProductsPage } />
    </Switch>
  );
}

export default App;
