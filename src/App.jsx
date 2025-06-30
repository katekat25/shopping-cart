import { Link, Outlet, useLocation } from 'react-router-dom'
import { createContext, useState } from "react";
import './App.css'
import Item from './Item';

export const ShopContext = createContext({
  products: [new Item("Test", 10, null)],
  cartItems: [],
  addToCart: () => { },
});

export default function App() {
  const location = useLocation();
  const isHomepage = location.pathname === "/";

  const [cartItems, setCartItems] = useState([]);
  const products = null;

  const addToCart = () => {
    setCartItems(prevCart => prevCart.push("New item"));
  }

  return (
    <ShopContext.Provider value={{ cartItems, products, addToCart }}>
      <div className="container">
        <nav className="navbar">
          <Link to="/">CoolStuff.com</Link>
          <div className="button-container">
            <a>Profile</a>
            <a>Search</a>
            <Link to="cart">My cart</Link>
          </div>
        </nav>
        {isHomepage && (
          <div>
            <h1>CoolStuff.com</h1>
            <p>We bring you the coolest stuff, all the time. Shop now, or be a poser. It's your choice.</p>
            <Link to="shop" className="shop">Shop now</Link>
          </div>
        )}

        <Outlet />

        <footer>
          <p>Brought to you by Kate Schumacher</p>
        </footer>
      </div>
    </ShopContext.Provider>
  )
}

