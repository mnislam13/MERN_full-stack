const myObj = {
    methodA: ()=> {
        console.log("Calling method A from inside object.");
    },
    methodB: ()=> {
        console.log("Calling method B from inside object.");
    },
    add: (a, b)=> {
        return a+b;
    },
    variableA: 13,
};

module.exports = myObj;