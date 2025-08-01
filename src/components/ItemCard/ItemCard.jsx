import styles from './ItemCard.module.css'
import Quantity from '../Quantity/Quantity';
import { ShopContext } from "../../App";
import { useContext } from "react";


const ItemCard = (props) => {
    const { updateProductQuantity } = useContext(ShopContext);

    return <>
        <div>
            <div className={styles.card}>
                <img src={props.product.image} alt={props.product.title} />
                <div className={styles.textOverlay}>
                    <div className={styles.detailsOverlay}>
                        <h3 className={styles.itemName}>{props.product.title}</h3>
                        <p className={styles.itemPrice}>${props.product.price}</p>
                    </div>
                    <div className={styles.quantity}>
                    </div>
                </div>
            </div >
            <Quantity
                product={props.product}
                quantity={props.product.quantity}
                addToCart={props.addToCart}
                updateProductQuantity={updateProductQuantity}></Quantity>
        </div>
    </>
}

export default ItemCard;