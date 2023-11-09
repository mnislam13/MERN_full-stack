const costArray = [10, 50, 90];
const prevCost = 100;
const reduceValue = costArray.reduce(
    (totalValue,currentValue) => totalValue + currentValue,
    prevCost
);
console.log("Total cost:",reduceValue);