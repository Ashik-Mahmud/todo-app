// scripting file 

const inputField = document.querySelector("#todo-field");
const addBtn = document.querySelector(".add-todo");
const clearallBtn = document.querySelector(".clearall");
const todoLists = document.querySelector(".todo-lists ul");
const todoMsg = document.querySelector(".todo-msg");
const ClerMsgBtn = document.querySelector(".clear-msg");
const CountItem = document.querySelector(".todo-footer .countItem");


// added todo into the todolist function


function AddTodo() {
    let data = inputField.value;
    if (data !== "") {
        let getLocalStorage = localStorage.getItem("Todo Lists");
        if (getLocalStorage === null) {
            listarr = [];
        } else {
            listarr = JSON.parse(getLocalStorage);
        }
        listarr.push(data);
        localStorage.setItem("Todo Lists", JSON.stringify(listarr));


    } else {
        todoMsg.classList.add("active");
        todoMsg.querySelector(".msg").textContent = "Input Something in Todo Field";

        setTimeout(() => {
            todoMsg.classList.remove("active");
        }, 5000);

    }
}
addBtn.addEventListener("click", AddTodo);

// work with enter button
document.addEventListener("keypress", (press) => {
    if (press.key === "Enter") {
        AddTodo();
    }
})


// Delete Item from todolist 
function delItem(item) {
    if (confirm("Would you like to delete?")) {
        item.parentElement.remove();
        CountItem.textContent = todoLists.children.length

    }
}

// Clear All todoLists 
function ClearAllTodoList() {
    if (confirm("Would you like to delete all todolist?")) {
        todoLists.innerHTML = "";
        CountItem.textContent = todoLists.children.length
    }
};
clearallBtn.addEventListener("click", ClearAllTodoList);


// Clear Notification Message function
ClerMsgBtn.addEventListener("click", () => todoMsg.classList.remove("active"))