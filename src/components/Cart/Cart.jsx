import ItemCard from "../ItemCard/ItemCard";
import styles from "./Cart.module.css"

function Cart() {
    return <div className={styles.container}>
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
    </div>
}

export default Cart;