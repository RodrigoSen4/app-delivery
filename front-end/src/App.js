import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import './App.css';

function App() {
  return (
    <Switch>
      <Route path="/login" component={ LoginPage } />
      <Route path="/register" component={ RegisterPage } />
      <Route path="/customer/products" component={ ProductsPage } />
      <Route>
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
}

export default App;
