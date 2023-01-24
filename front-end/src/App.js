import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import LoginPage from './pages/LoginPage/LoginPage';
import './App.css';
import RegisterPage from './pages/RegisterPage/RegisterPage';

function App() {
  return (
    <Switch>
      <Route path="/login" component={ LoginPage } />
      <Route path="/products" component={ ProductsPage } />
      <Route path="/register" component={ RegisterPage } />
      <Route>
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
}

export default App;
