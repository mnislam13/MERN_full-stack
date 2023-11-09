// Callback Functions
// function displayFunc(sum){
//     console.log("Print sum:",sum);
// }

// function displayFunc2(sum){
//     console.log("Print sum from second function:",sum);
// }

// function sumFunc(x,y, ourCallbackFunc){
//     sum=x+y;

//     ourCallbackFunc(sum);
// }

// sumFunc(15,5, displayFunc2);


// Callback Functions passing 2 func
// function displayEvenSum(sum){
//     console.log("Print even sum:",sum);
// }

// function displayOddSum(sum){
//     console.log("Print odd sum:",sum);
// }

// function sumFunc(x,y, ourEvenCallbackFunc, ourOddCallbackFunc){
//     sum=x+y;
//     if(sum%2==0){
//         ourEvenCallbackFunc(sum);
//     }
//     else{
//         ourOddCallbackFunc(sum);
//     }
    
// }

// sumFunc(15, 6, displayEvenSum, displayOddSum);

//map
// const dummyArray = [2,4,6,8,9];

// const mapArray = dummyArray.map((x) => {
//     const multiple =x*3;
//     return multiple;
// });

// console.log("Our mapped array:",mapArray);


// arrayObject = [
//     {
//         color:"purple",
//         count:12,
//     },
//     {
//         color:"red",
//         count:10,
//     },
// ];

// const mapObject = arrayObject.map((obj,i) => {
//     obj.count += 10;
//     return obj;
//     // return i;
// });
// console.log("Our mapped object:",mapObject);

//filter
// const array = [
//     "Sani",
//     "Abir",
//     "Sanjay",
//     "Pollob",
// ];
// const filteredArray = array.filter((x) => x.length>4);
// console.log("Filtered array:",filteredArray);

// const dummyArray = [2,4,6,8,9];
// const reduceValue = array.reduce(
//     (totalValue,currentValue) => totalValue + currentValue,
//     "BJIT: "
// );
// console.log("Our reduced value will be:",reduceValue);

// let greet_one = "Hello";
// let greet_two = "Helloooo";
// console.log(greet_one);
// // synchronous
// // for(let i = 0; i<300000; i++){} 
// // asynchronus
// setTimeout(function (){
//     console.log("Asynchronous");
// }, 2000);
// console.log(greet_two);


// let production = () =>{

//     setTimeout(()=>{
//       console.log("production has started")
//       setTimeout(()=>{
//         console.log("The fruit has been chopped")
//         setTimeout(()=>{
//           console.log("The fruit has been added")
//           setTimeout(()=>{
//             console.log("start the machine")
//             setTimeout(()=>{
//               console.log("Ïce cream has been made")
//               setTimeout(()=>{
//                 console.log("Toppings has been added")
//                 setTimeout(()=>{
//                   console.log("Served Ice cream")
//                 },2000)
//               },3000)
//             },2000)
//           },1000)
//         },1000)
//       },2000)
//     },500)
//   };
//   production();
  


// let ourPromise = new Promise((resolve, reject) => {
//     const x=2;
//     if(x==2){
//         resolve("Successful");
//     }else{
//         reject("Error value");
//     }
// })
// .then((scs) => {
//     console.log("It worked: ",scs);
// })
// .then(() => {
//     console.log("It worked again");
// })
// .catch((err) => {
//     console.log("The error message: ",err);
// })
// .finally(() => {
//     console.log("Execution completed.");
// });

