import { useContext, useMemo } from "react";
import { ShopContext } from "../../App";
import styles from "./Cart.module.css";
import { Link } from "react-router-dom";
import Quantity from "../Quantity/Quantity";

const Cart = () => {
  const { cartItems, removeFromCart, addToCart, updateProductQuantity } = useContext(ShopContext);

  const total = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.quantity * Number(item.price.replace(/,/g, "")),
      0
    )
  }, [cartItems]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My Cart</h2>
      {cartItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <p>Your cart is empty. <Link to="/shop" className={styles.shopLink}>Shop now</Link></p>
        </div>
      ) : (
        <div className={styles.infoContainer}>
          <div className={styles.orderSummary}>
            <h2 className={styles.subheading}>Order Summary</h2>
            {cartItems.map((item) => (
              <div className={styles.cartItem} key={item.id}>
                {/* <div className={styles.}></div> */}
                <img className={styles.itemImage} src={item.image} alt={item.title} />
                <div className={styles.cartItemRight}>
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
              </div>
            ))}

          </div>
          <div>
            <hr />
            <h2>
              Total: ${total.toLocaleString("en", { minimumFractionDigits: 2 })}
            </h2>
            <button className={styles.checkOutButton}>Check out</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
