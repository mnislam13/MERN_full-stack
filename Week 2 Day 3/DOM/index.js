// fetch API
async function getProductData() {
    const response = await fetch("https://dummyjson.com/products");
    const productData = await response.json();
    console.log(productData);
}

getProductData();

