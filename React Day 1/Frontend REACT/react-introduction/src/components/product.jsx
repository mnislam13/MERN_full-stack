import React from 'react';

function Product({ name, description, price }) {
    return (
        <div className="product">
            <h3>{name}</h3>
            <p>{description}</p>
            <p>Price: {price}</p>
        </div>
    );
}

export default Product;