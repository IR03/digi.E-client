// import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { createContext, useState } from 'react';
import Login from './Component/Login/Login';
import Header from './Component/Header/Header';
import AddProduct from './Component/AddProduct/AddProduct'
import Home from './Component/Home/Home';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';
import Checkout from './Component/Checkout/Checkout';
import Orders from './Component/Orders/Orders';
import Admin from './Component/Admin/Admin';
import DeleteProduct from './Component/DeleteProduct.js/DeleteProduct';
import UpdateProduct from './Component/UpdateProduct.js/UpdateProduct';



export const USerContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [cart, setCart] = useState({});

  return (
    <USerContext.Provider value={{ loggedInUser, setLoggedInUser, cart, setCart }}>
      <Router>
        <Switch>
          <PrivateRoute path="/admin">
            <Admin></Admin>
          </PrivateRoute>
          <PrivateRoute path="/addProduct">
            <AddProduct />
          </PrivateRoute>
          <PrivateRoute path="/updateProduct">
            <UpdateProduct />
          </PrivateRoute>
          <PrivateRoute path="/deleteProduct">
            <DeleteProduct />
          </PrivateRoute>
          <Route path="/login" >
            <Login />
          </Route>
          <div>
            <Header />
            <Route path='/home'>
              <Home />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <PrivateRoute path="/checkout">
              <Checkout />
            </PrivateRoute>
            <PrivateRoute path="/orders">
              <Orders />
            </PrivateRoute>
          </div>
        </Switch>
      </Router>
    </USerContext.Provider>

  );
}

export default App;
