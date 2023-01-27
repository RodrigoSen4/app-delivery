import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import CartPage from './pages/CartPage/CartPage';
import './App.css';
import OrdersPage from './pages/OrdersPage/OrdersPage';

function App() {
  return (
    <Switch>
      <Route path="/login" component={ LoginPage } />
      <Route path="/register" component={ RegisterPage } />
      <Route path="/customer/products" component={ ProductsPage } />
      <Route path="/customer/checkout" component={ CartPage } />
      <Route path="/customer/orders/:id" component={ OrdersPage } />
      <Route>
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
}

export default App;
