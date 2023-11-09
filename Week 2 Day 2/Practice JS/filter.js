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
    {
        id:3,
        personName:"Angkan",
        role : "Trainer",
        program:"MERN",
        trainingStatus:false,
    },
];


const filteredArray = objectArray.filter((obj) => obj.role.match("Trainee"));
console.log("Filtered array:",filteredArray);