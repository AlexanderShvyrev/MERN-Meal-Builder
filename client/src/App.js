import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/superhero/bootstrap.min.css';
import { Router } from '@reach/router'
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Home from './containers/Home';
import NavBar from './containers/NavBar';
import LandingPage from './containers/LandingPage';
import NewProduct from './admin/NewProduct';
import Dashboard from './admin/Dashboard';
import AddIngredients from './admin/AddIngredients';
import OneProduct from './containers/OneProduct';
import Checkout from './containers/Checkout';

function App() {
  return (
    <div className="App">
        <NavBar />
      <Router>
        <Register path='/' />
        <Login path='/login' />
        <Home path='/home/:_id' />
        {/* AdAdmimnin */}
        <NewProduct path='/admin/new' />
        <Dashboard path='/admin/dashboard' />
        <AddIngredients path = '/admin/ingredients' />
        
        {/* User */}
        <LandingPage path='/menu' />
        <OneProduct path='menu/:_id' />
        <Checkout path='/cart/:id' />
        
      </Router>
      
    </div>
  );
}

export default App;
