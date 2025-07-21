import styles from './Quantity.module.css'
import { useState } from 'react';

const Quantity = (props) => {
    const [quantity, setQuantity] = useState(props.quantity || 1);

    const handleAddToCart = (e) => {
        e.preventDefault();
        props.addToCart(props.product, Number(quantity));
    }

    return <>
        <form onSubmit={handleAddToCart}>
            <div className={styles.buttonContainer}>
                <button type="button" onClick={() => setQuantity(prev => Math.max(1, Number(prev) - 1))}>-</button>
                <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className={styles.quantityInput}
                />
                <button type="button" onClick={() => setQuantity(prev => Number(prev) + 1)}>+</button>
                <button type="submit">Add to cart</button>
            </div>
        </form>
    </>
}

export default Quantity;