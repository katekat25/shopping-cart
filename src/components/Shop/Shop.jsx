import { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import styles from "./Shop.module.css"
import { ShopContext } from "../../App";

function Shop() {
    const { products } = useContext(ShopContext);

    return (
        <div className={styles.container}>
            {products.map((product) => (
                <ItemCard key={product.id} product={product} />
            ))}
        </div>
    );
}

export default Shop;