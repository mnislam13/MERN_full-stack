import React, { useState } from 'react';
import './products.style.css';
import Product from './product';
import productData from './productData';


function Products() {
  const [products, setProducts] = useState(productData);

  const handleUpdateProduct = (id, name, description, price) => {
    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        return { ...product, name, description, price };
      }
      return product;
    });

    setProducts(updatedProducts);
  };

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  return (
    <div id="products" className="section">
      <h2>Our Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            onDelete={handleDeleteProduct}
            onUpdate={handleUpdateProduct}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;
