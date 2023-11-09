const fs = require('fs');
const { json } = require('stream/consumers');

class Product {
    getAll() {
        const data = fs.readFileSync("./data/manga.json", 'utf-8'); // utf-8 is the option which enables this to be supported in all the browsers
        // console.log(JSON.parse(data));
        return JSON.parse(data);
    }

    getOneById(id) {
        const data = fs.readFileSync("./data/manga.json", 'utf-8');
        const jsonData = JSON.parse(data);
        // const fetchedData = jsonData[id];
        // for (var i=0; i< jsonData.length; i++){
        //     if(jsonData[i].id == id){
        //         console.log(jsonData[i]);
        //         // return jsonData[i];
        //     }
        // }
        

        function myFunction(id, index, jsonData) {
            return jsonData[index].id === id;
        }
        const getOne = jsonData.find(myFunction);
        console.log(getOne.type);
    }

    add(product) {
        const data = fs.readFileSync("./data/manga.json", 'utf-8');
        const jsonData = JSON.parse(data);
        // console.log(JSON.parse(data));
        const newData = { ...product, id: jsonData[jsonData.length -1].id+1};
        jsonData.push(newData);
        // console.log(jsonData);
        fs.writeFileSync("./data/manga.json", JSON.stringify(jsonData));
        console.log(jsonData);
    }


    updateOneByID(id, product) {
        const data = fs.readFileSync("./data/manga.json", 'utf-8');
        const jsonData = JSON.parse(data);
        // console.log(jsonData);

        var found = false;
        for(var i=0; i<jsonData.length; i++) {
            if(jsonData[i].id == id){
                found = true;

                const productToUpdate = jsonData[i];
                jsonData[i] = {...productToUpdate, ...product};
                
                fs.writeFileSync("./data/manga.json", JSON.stringify(jsonData));
                console.log(jsonData);
                console.log("The product has been updated in the JSON file");
                break;
            }
        }
        if(!found) {
            console.log("Error! Object for the provided id is not found.");
        }
    }

    deleteOneByID(id) {
        const jsonData = JSON.parse(fs.readFileSync("./data/manga.json", 'utf-8'));
        // console.log(jsonData);

        var found = false;
        for (var i=0; i< jsonData.length; i++){
            if(jsonData[i].id == id){
                found = true;
                jsonData.splice(i, 1); //i,c
                // delete jsonData[i];

                fs.writeFileSync("./data/manga.json", JSON.stringify(jsonData));
                console.log(jsonData);
                console.log("The product has been deleted from the JSON file.");
                break;
            }
        }
        if(!found) {
            console.log("Error! Object for the provided id is not found.");
        }
    }
}

module.exports = new Product();