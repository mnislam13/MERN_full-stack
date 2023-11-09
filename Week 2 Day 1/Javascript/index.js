// console.log("basic javascript envioronment");
// learning variables
// let x=6;
// // let x=7;
// console.log("The value x is",x);

// var y=6;
// var y=7;
// console.log("The value y is",y);

// const c=8;
// // c=7;
// console.log("The value c is",c);

// objects
// const car = {
//     color: 'red',
//     model: 'funiev',
//     isConditionOkay: true,
// };
// console.log("The object car ",car);
// console.log("The car has color of",car.color);

//object array
// const arrayOfCars = [
//     {
//         id:1,
//         color: 'red',
//         model: 'funiev',
//         isConditionOkay: true,
//     },
//     {
//         id:2,
//         // color: 'blue',
//         // model: 'jsegfwe',
//         wheels:4,
//         isConditionOkay: true,
//     },
// ];
// console.log("The first car has color of",arrayOfCars[0].color);
// console.log("The second car has wheels",arrayOfCars[1].wheels);
// arrayOfCars.push({id:3, color:'black'});
// console.log("The third car has color of",arrayOfCars[2].color);

//bigINt (((not worked)))
// let bI=9999999999999999999999999999999999999999n;
// let rem=bI%2.0;

// console.log("The remainder",rem);

//function
// function doSum (x, y){
//     const sum = x+y;
//     // console.log("X is",x," Y is",y);
//     // console.log("The sum is",sum);
//     return sum;
// }
// // doSum(2,3);
// // doSum(2,2.3);

//anonymous func
// const anonymousDoSum = function (x, y){
//     const sum = x+y;
//     // console.log("X is",x," Y is",y);
//     // console.log("The sum is",sum);
//     return sum;
// }


// const rSum = anonymousDoSum(10,15)
// console.log("The returned sum is",rSum);

//arrow func
let sumFunc = (x, y) => {
    const sum = x+y;
    return sum;
}
console.log("The returned sum is",sumFunc(10,5));