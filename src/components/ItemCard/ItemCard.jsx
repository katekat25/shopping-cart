import styles from './ItemCard.module.css'

const ItemCard = (props) => {

    return <div className={styles.card}>
        <img src={props.product.image} alt={props.product.title} />
        <div className={styles.textOverlay}>
            <h3>{props.product.title}</h3>
            <p>${props.product.price}</p>
            <button onClick={() => props.addToCart(props.product)}>Add to cart</button>
        </div>
    </div>
}

export default ItemCard;