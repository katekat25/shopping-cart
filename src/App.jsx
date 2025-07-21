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
    const itemsToAdd = [];

    for (let i = 0; i < amount; i++) {
      itemsToAdd.push({ ...item, id: crypto.randomUUID() });
    }

    setCartItems(prevCart => {
      const updatedCart = [...prevCart, ...itemsToAdd];
      console.log("Adding to cart:", updatedCart);
      return updatedCart;
    });
  }

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

        const productsWithIDs = data.map(product => ({
          ...product,
          id: null
        }));

        setProducts(productsWithIDs);
        console.log(productsWithIDs);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    getAllProducts();
  }, []);


  return (
    <ShopContext.Provider value={{ cartItems, products, addToCart, removeFromCart, Item }}>
      <div className="container">
        <nav className="navbar">
          <Link to="/">CoolStuff.com</Link>
          <div className="button-container">
            <a>Profile</a>
            <a>Search</a>
            <div className="cart-container">
              <Link to="cart">
                <div>My cart</div>
                <img src="src/assets/cart.svg"></img>
                {cartItems.length > 0 && (
                  <div className="cart-badge">{cartItems.length}</div>
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

