// ISSUE: When an item is added and removed from the shop page, the item still shows up in the order summary on the cart page. Fix today!

import { Link, Outlet, useLocation } from 'react-router-dom'
import { createContext, useEffect, useState } from "react";
import './App.css'
import Item from './Item';
import Icon from '@mdi/react';
import { mdiShoppingOutline, mdiCart } from '@mdi/js';

export const ShopContext = createContext({
  products: [],
  cartItems: [],
  addToCart: () => { },
  removeFromCart: () => { },
  updateProductQuantity: () => { },
});

export default function App() {
  const location = useLocation();
  const isHomepage = location.pathname === "/";

  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  const addToCart = (item, amount = 1) => {
    setCartItems(prevCart => {
      if (amount === 0) {
        return prevCart.filter(cartItem => cartItem.id !== item.id);
      }
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);

      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: amount }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: amount }];
      }
    });
  };

  const removeFromCart = (itemToRemove) => {
    setCartItems(prevCart => prevCart.filter(item => item.id !== itemToRemove.id));
  }

  const updateProductQuantity = (productId, newQuantity) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId
          ? { ...product, quantity: newQuantity }
          : product
      )
    );
  };

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();

        data.forEach(element => {
          element.price = element.price.toLocaleString("en", { minimumFractionDigits: 2 });
        });

        const productsWithExtraData = data.map(product => ({
          ...product,
          id: crypto.randomUUID(),
          quantity: 0
        }));

        setProducts(productsWithExtraData);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    getAllProducts();
  }, []);

  const getCartLength = () => cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ShopContext.Provider value={{ cartItems, products, addToCart, removeFromCart, updateProductQuantity, Item }}>
      <div className="container">
        <nav className="navbar">
          <div className="logo-wrapper">
            <Link to="/" className="logo-link">
              <Icon path={mdiShoppingOutline} size={1} />
              <span>CoolStuff.com</span>
            </Link>
          </div>
          <div className="button-container">
            <Link to="shop">
              <div>Shop</div>
            </Link>
            <div className="cart-container">
              <Link to="cart" className="cart-link">
                <div>My cart</div>
                <Icon path={mdiCart} size={1} />
              </Link>
              {getCartLength() > 0 && (
                <div className="cart-badge">{getCartLength()}</div>
              )}
            </div>
          </div>
        </nav>
        {isHomepage && (
          <div>
            <h1>CoolStuff.com</h1>
            <p className="tagline">We bring you the coolest stuff, all the time. Shop now, or be a poser. It's your choice.</p>
            <Link to="shop" className="shop-button">Shop now</Link>
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

