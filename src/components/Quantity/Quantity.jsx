import styles from './Quantity.module.css'
import { useState } from 'react';

const Quantity = (props) => {
    const [quantity, setQuantity] = useState(props.quantity || 0);

    const handleAddToCart = (e) => {
        e.preventDefault();
        props.addToCart(props.product, Number(quantity));
    }

    return <>
        <form onSubmit={handleAddToCart}>
            <div className={styles.buttonContainer}>
                <div className={styles.quantity}>
                    <button type="submit" className={styles.leftButton} onClick={() => setQuantity(prev => Math.max(0, Number(prev) - 1))}>-</button>
                    <input
                        type="number"
                        min="0"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className={styles.quantityInput}
                    />
                    <button type="submit" className={styles.rightButton} onClick={() => setQuantity(prev => Number(prev) + 1)}>+</button>
                </div>
            </div>
        </form>
    </>
}

export default Quantity;