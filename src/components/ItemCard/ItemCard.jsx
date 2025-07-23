import styles from './ItemCard.module.css'
import Quantity from '../Quantity/Quantity';

const ItemCard = (props) => {
    return <div className={styles.card}>
        <img src={props.product.image} alt={props.product.title} />
        <div className={styles.textOverlay}>
            <div className={styles.detailsOverlay}>
                <h3 className={styles.itemName}>{props.product.title}</h3>
                <p className={styles.itemPrice}>${props.product.price}</p>
            </div>
            <div className={styles.quantity}>
            <Quantity product={props.product} addToCart={props.addToCart}></Quantity>
            </div>
        </div>
    </div >
}

export default ItemCard;