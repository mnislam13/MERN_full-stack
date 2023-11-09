// setInterval(() => {
//     console.log("Logging this message every 5 secs");
// },5000);

// const strImport = require('./fileA');
// console.log(strImport);


// const exportedClassA = require('./classA');
// // const classObj =new exportedClassA();
// // classObj.myFunction();

// //we can catch the oobject directly so that the constractor is called only once,,,
// //instead of making object everytime(Last two lines) and that will make the constractor to be called several times when objects are created several times from multiple files.
// exportedClassA.myFunction();


// const importedMyObj = require("./objectA");
// importedMyObj.methodA();


//for index.js we do not need to mention the like ./math/index,, we can write like ./math as it by default indicates to the index
// const Math = require("./math"); 
// const sum = Math.add(6, 7);
// console.log(sum);
//but for any other files in any folder except index,, we need to write .math/fieName
// const Math = require("./math/module.js"); 

// const importMyObj = require("./objectA");
// const addedValue = importMyObj.add(30, 14);
// console.log("Addition was executed in myObj and the sum is: ",addedValue);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Today's Task on Rectangle
const exportedRectangleClass = require('./math/rectangle');

const area = exportedRectangleClass.areaOfRectangle(8, 5);
console.log("Area of rectangle is: ", area);

const perimeter = exportedRectangleClass.perimeterOfRectangle(8, 5);
console.log("Perimeter of rectangle is: ", perimeter);



