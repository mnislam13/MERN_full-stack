let letVar="Najrul";
var varVar="BJIT";
const consVar=30144;

console.log("I am", letVar, "from", varVar, "and my ID is", consVar);
varVar = "BJIT Acadamey";
console.log("I am", letVar, "from", varVar, "and my ID is", consVar);

const arrayOfPeople = [
    {
        id:1,
        personName:"Najrul",
        role : "Trainee",
        program:"MERN",
        trainingStatus:true,
    },
    {
        id:2,
        personName:"Sani",
        role : "Trainee",
        program:"SQA",
        trainingStatus:true,
    },
    {
        id:3,
        personName:"Angkan",
        role : "Trainer",
        program:"MERN",
        trainingStatus:true,
    },
];

const printInfo = function (indexNo, pRole){
    if(pRole.match("Trainee")){
        if(arrayOfPeople[indexNo].trainingStatus){
            var statusCondition = "running";
        }else{
            var statusCondition = "not running";
        }
        console.log("Name is", arrayOfPeople[indexNo].personName,
        ". He is a trainee under the", arrayOfPeople[indexNo].program,
        "program. Currently his program is", statusCondition,".");
    }
    else if(pRole.match("Trainer")){
        if(arrayOfPeople[indexNo].trainingStatus){
            var statusCondition = "conducting";
        }else{
            var statusCondition = "not conducting";
        }
        console.log("Name is", arrayOfPeople[indexNo].personName,
        ". He is a trainer of the", arrayOfPeople[indexNo].program,
        "program. Currently he is", statusCondition, "the program.");
    }
}

let getRole = (indexNo) => {
    const personRole = arrayOfPeople[indexNo].role;
    return personRole;
}

function getIndex (idNO){
    var index = arrayOfPeople.findIndex(item => item.id === idNO);
    return index;
}


// ::::user input::::
// var prompt = require('prompt');
// prompt.start();
// const inputID = prompt("What is your id? ");

var inputID = 3;
var Index = getIndex(inputID);
var Role = getRole(Index);
printInfo(Index, Role);


var newID = 4;
addPeople(newID);

function addPeople(idNo){
    arrayOfPeople.push({
        id:idNo,
        personName:"Abir",
        role : "Trainee",
        program:"Java EE",
        trainingStatus:false,
    });
}

inputID = 4;
Index = getIndex(inputID);
Role = getRole(Index);
printInfo(Index, Role);