objectArray = [
    {
        id:1,
        personName:"Najrul",
        role : "Trainee",
        program:"MERN",
        trainingStatus:false,
    },
    {
        id:2,
        personName:"Sani",
        role : "Trainee",
        program:"SQA",
        trainingStatus:false,
    },
];

const mapObject = objectArray.map((obj) => {
    if(obj.trainingStatus != true){
        obj.trainingStatus = true;
        return obj;
    }
    
});

console.log("Our mapped object:",mapObject);