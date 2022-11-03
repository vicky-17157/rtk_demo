
import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {json} from 'react-router-dom';
import { add } from '../store/cartSlice';

const Cart = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => JSON.parse(state.cart));
    const handleRemove = (productId) => {
        let filterProducts =  products.filter((obj) => obj.id !== productId)
        dispatch(add(JSON.stringify(filterProducts)))
        
    };
const [quantity, SetQuantity] = useState(1);

// const handleIncrement=(id)=>{
//     products.map((product)=>{
//     if(id === product.id){
//     product.quantity =+1;
//     }})
//     }

// const handleDecrement=(id)=>{
//         products.map((product)=>{
//         if(id === product.id){
//         product.quantity =-1;
//         }})
//         }
// const handleIncrement = () => {
//     if(quantity < 10){
//         SetQuantity(prevCount => prevCount + 1);
// }};


// const handleDecrement = () => {
//     if(quantity > 1){
//         SetQuantity(prevCount => prevCount - 1);
//     }};

const handleIncrement = (id) => {
    products.map((product) => {
        if (id === product.id) {
            product.quantity++;
        }
    })
    dispatch(add(JSON.stringify(products)))
}

const handleDecrement = (id) => {
    let productQuantity;
    products.map((product) => {
        if (id === product.id) {
            product.quantity--;
            productQuantity = product.quantity;
        }
    })
    if(productQuantity == 0){
        let filterProducts =  products.filter((obj) => obj.id !== id);
        dispatch(add(JSON.stringify(filterProducts)))
    }else{

        dispatch(add(JSON.stringify(products)))
    }
}
    return (
        <div className="cart-center">
            <span>Your Cart</span>
            
            <div className="cart">
                
                {products.map((product) => (
                    <div key={product.id} className="cartCard">
                        <img src={product.image} alt="" />
                        <button type="button" onClick={handleIncrement(product.id)}>+</button>
                        <span>{quantity}</span>
                        <button type="button" onClick={handleDecrement(product.id)}>-</button>
                        <span>Product-Name: {product.title}</span>
                        <span>Variety: {product.name}</span>
                        <span>Price: Rs {product.prize}.55</span>
                        
                        <button
                            className="btn-cart"
                            onClick={() => handleRemove(product.id)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cart;