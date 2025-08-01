import styles from './Quantity.module.css';

const Quantity = ({ product, quantity, updateProductQuantity, addToCart }) => {
  const handleQuantityChange = (newQty) => {
    newQty = Math.max(0, newQty);
    updateProductQuantity(product.id, newQty);
    addToCart(product, newQty);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className={styles.buttonContainer}>
        <div className={styles.quantity}>
          <button
            type="button"
            className={styles.leftButton}
            onClick={() => handleQuantityChange(quantity - 1)}
          >
            -
          </button>
          <input
            type="number"
            min="0"
            value={quantity}
            onChange={(e) => handleQuantityChange(Number(e.target.value))}
            className={styles.quantityInput}
          />
          <button
            type="button"
            className={styles.rightButton}
            onClick={() => handleQuantityChange(quantity + 1)}
          >
            +
          </button>
        </div>
      </div>
    </form>
  );
};

export default Quantity;
