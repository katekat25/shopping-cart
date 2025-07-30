import styles from './Quantity.module.css'
import { useState } from 'react';
import { useEffect } from 'react';

const Quantity = (props) => {
    useEffect(() => {
        setQuantity(props.product.quantity || 0);
    }, [props.product.quantity]);

    const [quantity, setQuantity] = useState(props.quantity || 0);

    const handleAddToCart = (e) => {
        e.preventDefault();
        props.addToCart(props.product, Number(quantity));
    }

    return <>
        <form onSubmit={handleAddToCart}>
            <div className={styles.buttonContainer}>
                <div className={styles.quantity}>
                    <button
                        type="submit"
                        className={styles.leftButton}
                        onClick={() => {
                            const newQty = Math.max(0, Number(quantity) - 1);
                            setQuantity(newQty);
                            props.updateProductQuantity(props.product.id, newQty);
                        }}
                    >
                        -
                    </button>
                    <input
                        type="number"
                        min="0"
                        value={quantity}
                        onChange={(e) => {
                            const value = Math.max(0, Number(e.target.value));
                            setQuantity(value);
                            props.updateProductQuantity(props.product.id, value);
                        }
                        }
                        className={styles.quantityInput}
                    />
                    <button
                        type="submit"
                        className={styles.rightButton}
                        onClick={() => {
                            const newQty = Number(quantity) + 1;
                            setQuantity(newQty);
                            props.updateProductQuantity(props.product.id, newQty);
                        }}
                    >
                        +
                    </button>
                </div>
            </div>
        </form>
    </>
}

export default Quantity;