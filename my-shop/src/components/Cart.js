//// Students : Raz Butbul :319083747, Lion Miakshin :315992735
import React, { useEffect, useState } from 'react';

const Cart = ({ cartItems, updateCart, handleDecrement, handleIncrement }) => {
    const [filteredCartItems, setFilteredCartItems] = useState([]);

    useEffect(() => {
        const filteredItems = cartItems.filter(item => item.quantity > 0);
        setFilteredCartItems(filteredItems);
    }, [cartItems]);


    const nameWithOutemoji = ({ item }) => {//cutting the emoji from the item name and return it 
        if (item && item.name) {
            return item.name.slice(0, -3);
        }
        return ('');

    }
    const calculateTotalPrice = () => {// The total price of all the items in the cart
        const totalPrice = filteredCartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        return totalPrice.toFixed(2);
    };

    const calculateItemPrice = (item) => {// Per item 
        const itemPrice = (item.price * item.quantity).toFixed(2);
        return `price: $${itemPrice}`;
    };

    const handleDone = () => { // delete the items in the cart and send 'thanks' alert
        fetch('http://localhost:8000/Cart', {
            method: 'DELETE',
        })
            .then(() => {
                updateCart([]);
                alert('Thanks for your purchase at The Good Taste!');
            })
            .catch((error) => console.error('Error clearing the cart:', error));
    };
    const ClearCart = () => { // clear the cart
        fetch('http://localhost:8000/Cart', {
            method: 'DELETE',
        })
            .then(() => {
                updateCart([]);

            })
    };

    return (// Show all  items in the cart 
        <div>
            <h2 className='CartTitle'>Cart:</h2>
            {filteredCartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    {filteredCartItems.map((item) => (
                        <div key={item.id}>
                            <img className="CartIMG" src={item.image} alt={item.name} />
                            <h3>{item.name}</h3>
                            <b><p>${item.price}</p></b>
                            <p>
                                Quantity:
                                <button className='decButton' onClick={() => handleDecrement(item.id)}> - </button>
                                {item.quantity}
                                <button className='incButton' onClick={() => handleIncrement(item.id)}> + </button>
                            </p>
                            <b><p> {nameWithOutemoji({ item })}'s {calculateItemPrice(item)}</p></b>
                        </div>
                    ))}
                    <div className='totalPrice'><h3><b>Total Price: ${calculateTotalPrice()}</b></h3></div>
                    <button className='doneButton' onClick={handleDone}>Check out ✔️ </button> <button className='ClearCart' onClick={ClearCart}>Clear cart ✖️ </button>
                </>
            )}
        </div>
    );
};

export default Cart;



