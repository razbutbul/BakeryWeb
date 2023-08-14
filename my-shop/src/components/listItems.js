// Students : Raz Butbul :319083747, Lion Miakshin :315992735

import React from 'react';
const ListItems = ({ items, SubTitle, addToCart }) => {
    return (
        <div>
            <div className="SubTitle">
                <h2>{SubTitle}</h2>
            </div>
            <div className="items-container">
                {items.map((data) => (
                    <div className="homeItems" key={data.id}>
                        <h2 className='nameItem'>{data.name}</h2>
                        <p className='desInHomePage'><b>description:</b> {data.description}</p>
                        <img src={data.image} alt={data.name} className="image" />
                        <p>price: <b>${data.price}</b></p>
                        <button className="AddToCartButton" onClick={() => addToCart(data)}>
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListItems;
