import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../store/cartSlice';
import { fetchProducts } from '../store/productSlice';
import { STATUSES } from '../store/productSlice';

const Products = () => {
    const dispatch = useDispatch();
    const { data: products, status } = useSelector((state) => state.product);
    const productItem = useSelector((state) => state.cart);
    // const [products, setProducts] = useState([]);

    useEffect(() => {
        dispatch(fetchProducts());
        // const fetchProducts = async () => {
        //     const res = await fetch('https://fakestoreapi.com/products');
        //     const data = await res.json();
        //     console.log(data);
        //     setProducts(data);
        // };
        // fetchProducts();
    }, []);

    const handleAdd = (product) => {
        let isProductAdded = false;
        let addedProductItem = productItem ? JSON.parse(productItem) : [];
        if (addedProductItem) {
            addedProductItem.map((obj) => {
                if (obj.id === product.id) {
                    obj.quantity++;
                    isProductAdded = true;
                }
            })

            if (!isProductAdded) {
                // productItem = Object.assign([],)
                addedProductItem.push({ ...product, quantity: 1 })
            }
        } else {
            addedProductItem = [];
            addedProductItem.push({ ...product, quantity: 1 })
        }
        dispatch(add(JSON.stringify(addedProductItem)));
    };

    if (status === STATUSES.LOADING) {
        return <h2>Loading....</h2>;
    }

    if (status === STATUSES.ERROR) {
        return <h2>Something went wrong!</h2>;
    }
    return (
        <div className="new">
            <div className="productsWrapper">
                {products.map((product) => (
                    <div>
                        <div className="card" key={product.id}>
                            <div>
                                <img src={product.image} alt="" />
                            </div>
                            <div className="div-left">
                                <p className="title">{product.title}</p>
                                <p className="name">{product.name}</p>
                            </div>
                            <div className="div-right">
                                <p>$ {product.price}.55</p>
                            </div>
                        </div>
                        <div>
                            <button onClick={() => handleAdd(product)} className="btn">
                                ADD TO BASKET
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default Products;