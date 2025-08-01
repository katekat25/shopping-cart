import { useContext } from "react";
import { ShopContext } from "../../App";
import styles from "./Cart.module.css";
import { Link } from "react-router-dom";
import Quantity from "../Quantity/Quantity";

const Cart = () => {
  const { cartItems, removeFromCart, addToCart, updateProductQuantity } = useContext(ShopContext);

  const total = cartItems.reduce(
    (sum, item) => sum + item.quantity * Number(item.price.replace(/,/g, "")),
    0
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My Cart</h2>
      {cartItems.length === 0 ? (
        <p>
          Your cart is empty. <Link to="/shop" className={styles.shopLink}>Shop now</Link>
        </p>
      ) : (
        <div className={styles.infoContainer}>
          <div className={styles.shippingInfo}>
            <h2 className={styles.subheading}>Shipping information</h2>
            <form>
              <input type="text" />
              <input type="email" />
              <input type="text" />
              <input type="number" />
            </form>
          </div>
          <div className={styles.orderSummary}>
            <h2 className={styles.subheading}>Order Summary</h2>
            {cartItems.map((item) => (
              <div className={styles.cartItem} key={item.id}>
                <h3>{item.title} x{item.quantity}</h3>
                <div className={styles.cartItemBottom}>
                  <Quantity
                    product={item}
                    quantity={item.quantity}
                    updateProductQuantity={updateProductQuantity}
                    addToCart={addToCart}
                  />
                  <h3 className={styles.price}>
                    ${(
                      item.quantity * Number(item.price.replace(/,/g, ""))
                    ).toLocaleString("en", { minimumFractionDigits: 2 })}
                  </h3>
                  <button onClick={() => removeFromCart(item)}>Remove item</button>
                </div>
              </div>
            ))}
            <hr />
            <h2>
              Total: ${total.toLocaleString("en", { minimumFractionDigits: 2 })}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
