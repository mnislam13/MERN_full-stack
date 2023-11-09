import React from 'react';
import './products.style.css';
import Product from './product';
import productData from './productsData';

function Products() {
  return (
    <div id="products" className="section">
      <h2>Our Products</h2>
      <div className="product-list">
        {productData.map((product) => (
          <Product
            key={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;