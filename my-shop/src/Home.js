//// Students : Raz Butbul :319083747, Lion Miakshin :315992735
import React from 'react';
import ListItems from "./components/listItems";
import useFetch from "./useFetch";

const Home = ({ addToCart }) => { // Add addToCart as a prop
    const { data: items, error } = useFetch('http://localhost:8000/products');

    return (
        <div className="Home">
            {error && <div>{error}</div>}
            {items && <ListItems items={items} SubTitle=" all the items: " addToCart={addToCart} />} {/* Pass addToCart as a prop */}
        </div>
    );
};

export default Home;
