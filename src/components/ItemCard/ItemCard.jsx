import styles from './ItemCard.module.css'

const ItemCard = (props) => {

    return <div className={styles.card}>
        I'm an item!
        {props.item}
    </div>
}

export default ItemCard;