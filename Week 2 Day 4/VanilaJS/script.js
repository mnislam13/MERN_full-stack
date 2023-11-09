document.addEventListener("DOMContentLoaded", () => {
    const domTodoForm = document.querySelector(".todo-form");
    const domTodoList = document.querySelector(".todo-list");
    const domTodoItem = document.querySelector(".todo-item");
    const domDeleteSection = document.querySelector(".delete-section");

    function createNewTaskItem(newItemText) {
        const domTaskItem = document.createElement("div");
        domTaskItem.className = "todo-item";

        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.className = "item-checkbox";
        domTaskItem.appendChild(checkBox);

        const labelText = document.createElement("label");
        labelText.className = "task-label";
        labelText.classList.add
        labelText.classList.remove
        labelText.innerText = newItemText;
        domTaskItem.appendChild(labelText);

        const labelDate = document.createElement("label");
        labelDate.className = "date-label";
        // let currentDate = new Date().toJSON().slice(0, 10);
        // currentDate = date.format('D/MM/YYYY');
        // let date = new Date().toLocaleDateString("bn_BD");
        // console.log(currentDate);
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${day}-${month}-${year}`;

        labelDate.innerText = currentDate;
        domTaskItem.appendChild(labelDate);

        const editButton = document.createElement("button");
        editButton.className = "edit-task-button";
        editButton.innerHTML = "edit";
        domTaskItem.appendChild(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-task-button";
        deleteButton.innerHTML = "x";
        domTaskItem.appendChild(deleteButton);

        return domTaskItem;
    }

    domTodoForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const newTasktext = document.getElementById("add-task-text");
        console.log("New input text is : ", newTasktext.value);

        if (newTasktext.value.trim() !== "") {
            const newlyCreatedItem = createNewTaskItem(newTasktext.value);

            domTodoList.appendChild(newlyCreatedItem);

            newTasktext.value = "";
        }
    });

    // edit one task
    domTodoList.addEventListener("click", (event) => {
        if (event.target.matches(".edit-task-button")) {
            console.log("edit button ");
            // const domEditItem = event.target.parentElement;
            // console.log("Our parent Element ", domEditItem);
            // const domEditItem =
            const addBtn = document.getElementById("add-task-button");

            addBtn.innerText = "save";
            // if (confirm("Do you want to delete it?")) {
            //     domTodoList.removeChild(domEditItem);
            // }
        }
    });

    //edit one task
    domTodoList.addEventListener("click", (event) => {
        if (event.target.matches(".delete-task-button")) {
            // const saveButton = document.querySelector("#add-task-button");
            // saveButton.innerText = "save";
            const domItem = event.target.parentElement.querySelector(".task-label");
            
        }
    });

    //delete one task
    domTodoList.addEventListener("click", (event) => {
        if (event.target.matches(".delete-task-button")) {
            const domItem = event.target.parentElement;
            console.log("Our parent Element ", domItem);

            if (confirm("Do you want to delete it?")) {
                domTodoList.removeChild(domItem);
            }
        }
    });

    //delete section
    domDeleteSection.addEventListener("click", (event) => {
        // delete all
        function removeAllChildNodes(parent) {
            if (confirm("Do you want to delete all tasks?")) {
                while (parent.firstChild) {
                    parent.removeChild(parent.firstChild);
                }
            }
        }
        // delete selected
        function removeSelectedChildNodes(parent) {
            if (confirm("Do you want to delete selected tasks?")) {
                var children = parent.children;
                var child;
                var checkbox = false;
                // console.log(children.length);
                for (var i = 0; i < children.length; ) {
                    // console.log(i);
                    child = children[i];
                    
                    checkbox = child.querySelector(".item-checkbox");
                    console.log(checkbox.checked);
                    if(checkbox.checked == true){
                        parent.removeChild(child);
                    }else{
                        i++;
                    }
                }

            }
        }





        // calling the functions of delete section
        if (event.target.matches("#delete-all")) {
            removeAllChildNodes(domTodoList);
        }
        if(event.target.matches("#delete-selected")){
            removeSelectedChildNodes(domTodoList);
        }

    });
});



// delete selection
// function stateHandle() {
//     if (document.querySelector(".input").value === "") {
//         button.disabled = true; //button remains disabled
//     } else {
//         button.disabled = false; //button is enabled
//     }
// }