//add task button
const addTaskBtnDOM = document.getElementById("idAddTaskBtn");
addTaskBtnDOM.style.backgroundColor = "grey";
addTaskBtnDOM.style.borderRadius = "5px";

//fetching tasks from api and showing in assigned task
async function getTaskData() {
        const taskDOM = document.getElementById("idTaskTextFromJson");
        const taskBtn = document.getElementById("idTaskFromJsonBtn");
        const response = await fetch("https://dummyjson.com/todos/1");
        const todoJsonData = await response.json();
        console.log("Data has fetched: ",todoJsonData);

        taskDOM.innerText = todoJsonData.todo;
        taskDOM.style.backgroundColor = "orange";
        taskDOM.style.border = "1px solid black";
        taskDOM.style.width = "100%";
        taskDOM.style.height = "40px";
        // taskDOM.style.padding = "0px auto";
        // taskDOM.style.marginLeft = "10px"
        

        taskBtn.style.display = "block";

}

// create a task
function creatingElement() {
    const assignedTaskDivDOM = document.getElementById("idDivAssignedTask");
    const divElement = document.createElement("div");
    

    const newTaskDOM = document.createElement("h4");
    var x = document.getElementById("idAddTaskInput").value;
    if(x != ""){
        newTaskDOM.innerText  = x;
        newTaskDOM.style.backgroundColor = "grey";
        newTaskDOM.style.border = "1px solid black";
        newTaskDOM.style.width = "100%";
        newTaskDOM.style.height = "40px";
        // taskDOM.style.padding = "0px auto";
        newTaskDOM.style.marginLeft = "10px"
        newTaskDOM.style.padding = "0px !important";
    
        const newTaskBtn = document.createElement("button");
        newTaskBtn.innerText  = "done"
        newTaskBtn.style.width = "25%";
        newTaskBtn.style.height = "20px";
        newTaskBtn.style.backgroundColor = "green";
    
        divElement.appendChild(newTaskDOM);
        divElement.appendChild(newTaskBtn);
        assignedTaskDivDOM.appendChild(divElement);
    }
    
}


function onMouseOver() {
    const btn = document.getElementById("idAddTaskBtn");
    btn.style.fontSize = "20px";
}
function onMouseLeave() {
    const btn = document.getElementById("idAddTaskBtn");
    btn.style.fontSize = "15px";
}