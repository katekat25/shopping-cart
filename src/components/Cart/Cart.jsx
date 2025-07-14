import { useContext } from "react";
import { ShopContext } from "../../App";
import styles from "./Cart.module.css"

const Cart = () => {
    const { cartItems } = useContext(ShopContext);
    return <>
        <div className={styles.container}>
            {cartItems.map((item) => (
                <h3>{item.title}</h3>
            ))}
        </div>
    </>
}

export default Cart;