import { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import styles from "./Shop.module.css"
import { ShopContext } from "../../App";

function Shop() {
    const { products, addToCart } = useContext(ShopContext);

    return (
        <>
            <h2 className={styles.title}>Shop</h2>
            <div className={styles.container}>
                {products.map((product) => (
                    <ItemCard key={product.id} product={product} addToCart={addToCart} />
                ))}
            </div>
        </>
    );
}

export default Shop;