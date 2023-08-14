//// Students : Raz Butbul :319083747, Lion Miakshin :315992735
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './Home';
import Cart from './components/Cart';

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cartDataFromLocalStorage = JSON.parse(localStorage.getItem('cartItems'));
    if (cartDataFromLocalStorage) {
      setCartItems(cartDataFromLocalStorage);
    }
  }, []);

  const updateCart = (updatedItems) => {
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const handleDecrement = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        const updatedQuantity = Math.max(0, item.quantity - 1);
        return { ...item, quantity: updatedQuantity };
      }
      return item;
    });
    updateCart(updatedCartItems);
  };

  const handleIncrement = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        const updatedQuantity = item.quantity + 1;
        return { ...item, quantity: updatedQuantity };
      }
      return item;
    });
    updateCart(updatedCartItems);
  };

  const addToCart = (itemToAdd) => {
    const existingItem = cartItems.find((item) => item.id === itemToAdd.id);
    if (existingItem) {
      const updatedCartItems = cartItems.map((item) => {
        if (item.id === existingItem.id) {
          const updatedQuantity = item.quantity + 1;
          return { ...item, quantity: updatedQuantity };
        }
        return item;
      });
      updateCart(updatedCartItems);
    } else {
      const updatedCartItems = [...cartItems, { ...itemToAdd }];
      updateCart(updatedCartItems);
    }
  };

  return (
    <Router>
      <div>
        <Header />
        <div className='content'>
          <Switch>
            <Route exact path="/">
              <Home
                addToCart={addToCart}
                cartItems={cartItems}
                updateCart={updateCart}
                handleDecrement={handleDecrement}
                handleIncrement={handleIncrement}
              />
            </Route>
            <Route path="/Cart">
              <Cart
                cartItems={cartItems}
                updateCart={updateCart}
                handleDecrement={handleDecrement}
                handleIncrement={handleIncrement}
              />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
