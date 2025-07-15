import { useContext } from "react";
import { ShopContext } from "../../App";
import styles from "./Cart.module.css"
import { Link } from "react-router-dom";

const Cart = () => {
    const { cartItems, removeFromCart } = useContext(ShopContext);
    return <>
        <div className={styles.container}>
            {cartItems.length === 0 ? (
                <p>Your cart is empty. <Link to="/shop">Shop now</Link></p>
            ) : (
                cartItems.map((item) => (
                    <div>
                        <h3>{item.title}</h3>
                        <button onClick={() => removeFromCart(item)}>Remove item</button>
                    </div>
                ))
            )}
        </div>
    </>
}

export default Cart;