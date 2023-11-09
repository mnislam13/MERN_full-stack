function addition(x,y){
  const result = x+y;
  console.log("Value after addition:",result);
}
function subtraction(x,y){
    const result = x-y;
    console.log("Value after subtraction:",result);
}
function multiply(x,y){
  const result = x*y;
  console.log("Value after multiplication:",result);
}

function calculation(choice, x, y, addCallbackFunc, subCallbackFunc, multiCallbackFunc){
    if(choice==1){
        addCallbackFunc(x,y);
    }
    else if(choice==2){
        subCallbackFunc(x,y);
    }
    else{
        multiCallbackFunc(x,y);
    }
}


const choice = 2;
const firstNum = 15;
const secondNum = 5;

calculation(choice, firstNum,secondNum, addition, subtraction, multiply);