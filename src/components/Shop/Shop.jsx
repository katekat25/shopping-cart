import ItemCard from "../ItemCard/ItemCard";
import styles from "./Shop.module.css"

function Shop() {
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

export default Shop;