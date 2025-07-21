import { Link, Outlet, useLocation } from 'react-router-dom'
import { createContext, useEffect, useState } from "react";
import './App.css'
import Item from './Item';

export const ShopContext = createContext({
  products: [],
  cartItems: [],
  addToCart: () => { },
  removeFromCart: () => { },
  Item: null,
});

export default function App() {
  const location = useLocation();
  const isHomepage = location.pathname === "/";

  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  const addToCart = (item, amount = 1) => {
    setCartItems(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);

      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: amount } // Replace with new amount
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
        console.log(productsWithExtraData);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    getAllProducts();
  }, []);

  const getCartLength = () => cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ShopContext.Provider value={{ cartItems, products, addToCart, removeFromCart, Item }}>
      <div className="container">
        <nav className="navbar">
          <Link to="/">CoolStuff.com</Link>
          <div className="button-container">
            <Link to="shop">
              <div>Shop</div>
            </Link>
            <div className="cart-container">
              <Link to="cart">
                <div>My cart</div>
                <img src="src/assets/cart.svg"></img>
                {getCartLength() > 0 && (
                  <div className="cart-badge">{getCartLength()}</div>
                )}
              </Link>
            </div>
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

