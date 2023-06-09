import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import AdmPage from './pages/AdmPage/AdmPage';
import CartPage from './pages/CartPage/CartPage';
import OrdersPage from './pages/OrdersPage/OrdersPage';
import DetailsOrderPage from './pages/DetailsOrderPage/DetailsOrderPage';
import './App.css';

function App() {
  return (
    <Switch>
      <Route path="/login" component={ LoginPage } />
      <Route path="/register" component={ RegisterPage } />
      <Route path="/customer/products" component={ ProductsPage } />
      <Route path="/admin/manage" component={ AdmPage } />
      <Route path="/customer/checkout" component={ CartPage } />
      <Route
        exact
        path="/customer/orders"
        render={ (props) => <OrdersPage { ...props } userRole="customer" /> }
      />
      <Route
        exact
        path="/seller/orders"
        render={ (props) => <OrdersPage { ...props } userRole="seller" /> }
      />
      <Route
        exact
        path="/customer/orders/:id"
        render={ (props) => (
          <DetailsOrderPage { ...props } page="order_details" userRole="customer" />
        ) }
      />
      <Route
        exact
        path="/seller/orders/:id"
        render={ (props) => (
          <DetailsOrderPage { ...props } page="order_details" userRole="seller" />
        ) }
      />
      <Route path="/customer/orders/:id" component={ DetailsOrderPage } />
      <Route path="/seller/orders/:id" component={ DetailsOrderPage } />
      <Route>
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
}

export default App;
