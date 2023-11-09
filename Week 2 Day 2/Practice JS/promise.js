objectArray = [
    {
        id:1,
        taskStatus:true,
    },
    {
        id:2,
        taskStatus:true,
    },
];

let taskPromise = new Promise((resolve, reject) => {
    const taskCompleted = objectArray[0].taskStatus;

    if(taskCompleted == true){
        resolve("Task is completed.");
    }else{
        
        reject("Task is not completed.");
    }
})
.then((successMessage) => {
    console.log("Congratulations!",successMessage);
})
.then(() => {
    console.log("You are doing great.");
})
.catch((errorMessage) => {
    console.log("Oops!",errorMessage);
})
.catch(() => {
    console.log("Practice and do not lose hope.");
})
.finally(() => {
    console.log("You are assigned to a task for tomorrow.");
});
