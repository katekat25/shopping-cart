import { useContext } from "react";
import { ShopContext } from "../../App";
import styles from "./Cart.module.css";
import { Link } from "react-router-dom";
import Quantity from "../Quantity/Quantity";

const Cart = () => {
    const { cartItems, removeFromCart, addToCart } = useContext(ShopContext);

    const total = cartItems.reduce((sum, item) => {
        return sum + item.quantity * Number(item.price.replace(/,/g, ""));
    }, 0);

    return (
        <div className={styles.container}>
            {cartItems.length === 0 ? (
                <p>Your cart is empty. <Link to="/shop">Shop now</Link></p>
            ) : (
                <>
                    {cartItems.map((item) => (
                        <div key={item.id}>
                            <h3>{item.title}</h3>
                            <Quantity
                                addToCart={addToCart}
                                product={item}
                                quantity={item.quantity}
                            />
                            <h3>
                                ${(
                                    item.quantity * Number(item.price.replace(/,/g, ""))
                                ).toLocaleString("en", { minimumFractionDigits: 2 })}
                            </h3>
                            <button onClick={() => removeFromCart(item)}>Remove item</button>
                        </div>
                    ))}
                    <hr />
                    <h2>
                        Total: ${total.toLocaleString("en", { minimumFractionDigits: 2 })}
                    </h2>
                </>
            )}
        </div>
    );
};

export default Cart;
