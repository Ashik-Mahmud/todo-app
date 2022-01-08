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
        inputField.value = "";
        // call show todo list function
        ShowTodoList();

    } else {
        todoMsg.classList.add("active");
        todoMsg.querySelector(".msg").textContent = "Input Something in Todo Field";

        setTimeout(() => {
            todoMsg.classList.remove("active");
        }, 5000);

    }
}
addBtn.addEventListener("click", AddTodo);


// Show Task function
function ShowTodoList() {
    let getLocalStorage = localStorage.getItem("Todo Lists");
    if (getLocalStorage === null) {
        listarr = [];
    } else {
        listarr = JSON.parse(getLocalStorage);
    }
    let liTag = '';
    listarr.forEach((element, index) => {
        liTag += ` <li><span class="name">${element}</span><span onclick="deleteItem(${index})" title="Delete this Item" class="action">C</span></li>`;
    });
    todoLists.innerHTML = liTag;
    CountItem.textContent = listarr.length;
    if (listarr.length === 0) {
        clearallBtn.classList.add("disabled");
    } else {
        clearallBtn.classList.remove("disabled");
    }

};

ShowTodoList()


// Delete todolist when click in todo item 
function deleteItem(index) {
    if (confirm("Would You like to Earse this list ?")) {
        let getLocalStorage = localStorage.getItem("Todo Lists");
        listarr = JSON.parse(getLocalStorage);
        listarr.splice(index, 1);
        localStorage.setItem("Todo Lists", JSON.stringify(listarr));
        // call show todo list function
        ShowTodoList();
    }

};




// work with enter button
document.addEventListener("keypress", (press) => {
    if (press.key === "Enter") {
        AddTodo();
    }
})



// Clear All todoLists 
function ClearAllTodoList() {
    if (confirm("Would you like to delete all todolist?")) {
        listarr = [];
        localStorage.setItem("Todo Lists", JSON.stringify(listarr));
        // call show todo list function
        ShowTodoList();
    }
};
clearallBtn.addEventListener("click", ClearAllTodoList);


// Clear Notification Message function
ClerMsgBtn.addEventListener("click", () => todoMsg.classList.remove("active"))