// const product = require('./product');
const importedProduct = require('./product');

const main = () => {
    // const total = importedProduct.getAll();
    //console.log(total);

    // importedProduct.add ({
    //     // "id": 1,
    //     "name": "Bleach, Vol. 1",
    //     "price": 9.99,
    //     "stock": 50,
    //     "author": "Tite Kubo"
    // });
    importedProduct.getOneById(10);


    // TODAY's TASK: UPDATE //
    // idToUpdate = 10;
    // productUpdate = {
    //     "name": "Updated One Piece, Vol. 1",
    //     "stock": 113
    // }
    // importedProduct.updateOneByID(idToUpdate, productUpdate);

    // BONUS TASK: DELETE ONE //
    // idOfProductToDelete = 7;
    // importedProduct.deleteOneByID(idOfProductToDelete);
};

main();



// const data = {
//     "id": 5,
//     "name": "Bleach, Vol. 1",
//     "price": 9.99,
//     "stock": 50,
//     "author": "Tite Kubo"
// };
// const newData = {...data, id = 15};  // ... means it iterate the whole data  attribute by attribute and when we send an object it iterate through the objects. This is spreading property