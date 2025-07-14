import { useContext } from "react";
import { ShopContext } from "../../App";
import styles from "./Cart.module.css"

const Cart = () => {
    const { cartItems, removeFromCart } = useContext(ShopContext);
    return <>
        <div className={styles.container}>
            {cartItems.map((item) => (
                <div>
                    <h3>{item.title}</h3>
                    <button onClick={() => removeFromCart(item)}>Remove item</button>
                </div>
            ))}
        </div>
    </>
}

export default Cart;