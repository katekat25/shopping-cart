import styles from './ItemCard.module.css'
import { useState } from 'react';

const ItemCard = (props) => {
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = (e) => {
        e.preventDefault();
        props.addToCart(props.product, Number(quantity));
    }

    return <div className={styles.card}>
        <img src={props.product.image} alt={props.product.title} />
        <div className={styles.textOverlay}>
            <h3>{props.product.title}</h3>
            <p>${props.product.price}</p>
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
        </div>
    </div>
}

export default ItemCard;