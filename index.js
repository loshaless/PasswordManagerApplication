// TODO LIST 
let todos = [
    { task: "www.facebook.com", dueDate: "budi", password: "$%^DFVSA", id: 1 },
    { task: "www.google.com", dueDate: "andi", password: "!@SF#@$#", id: 2 },
    { task: "www.twitter.com", dueDate: "nila", password: "!@GJY^&*", id: 3 }
]

function filterTodos(todoList) {
    let result = []
    for (let i = 0; i < todoList.length; i++) {
        if (todoList[i][1] !== "") {
            result.push([todoList[i][0], todoList[i][1]])
        }
    }
    return result
}
// console.log(filterTodos(todos))

function createObject(todos) {
    let result = []
    let id = todos[todos.length - 1]["id"] + 1
    for (let i = 0; i < todos.length; i++) {
        result.push({ task: todos[i][0], dueDate: todos[i][1], password: todos[i][2], id: id })
    }
    return result
}
// console.log(createObject(todos))

// RENDER DI BROWSER
// selectors
const formInputUrl = document.querySelector(".form-input-url");
const formInputName = document.querySelector(".form-input-name");
const formInputPassword = document.querySelector(".form-input-password");
const formButton = document.querySelector(".form-button");
const todoList = document.querySelector(".todo-list");
formButton.addEventListener("click", addTodo);
todoList.addEventListener("click", edit);

// lengkapi function dibawah ini untuk menghandle input text dan input date kosong
function addTodo(event) {
    event.preventDefault();
    // your code here
    if (formInputUrl.value == "") {
        alert("tidak ada URL yang dimasukan")
    }
    else if (formInputName.value == "") {
        alert("tidak ada Nama yang dimasukan")
    }
    else if (formInputPassword.value == "") {
        alert("tidak ada Password yang dimasukan")
    }
    else {
        todoList.innerHTML = ''
        if (todos.length === 0) {
            id = 1
        }
        else {
            id = todos[todos.length - 1]["id"] + 1
        }
        let objek = { task: formInputUrl.value, dueDate: formInputName.value, password: formInputPassword.value, id: id }
        todos.push(objek)
        render()
    }
    console.log(todos.length);
}

// lengkapi function dibawah ini untuk menjalankan fungsi tombol done
function edit(event) {
    const item = event.target;
    if (item.classList[0] === "edit-btn") {
        let variabel = item.parentElement.parentElement.children[2].innerText
        var name = prompt("Please enter your name", "nama");
        if (name === "") {
            alert("nama tidak boleh kosong")
            return;
        }
        else if (name === null) {
            for (let i = 0; i < todos.length; i++) {
                if (todos[i]["id"] === Number(variabel)) {
                    name = todos[i]["dueDate"]
                }
            }
        }
        else {
            for (let i = 0; i < todos.length; i++) {
                if (todos[i]["id"] === Number(variabel)) {
                    todos[i]["dueDate"] = name
                }
            }
            render()
        }
        var password = prompt("Please enter your password", "password");
        if (password === "") {
            alert("password tidak boleh kosong")
            return;
        }
        else if (password === null) {
            return;
        }
        else {
            for (let i = 0; i < todos.length; i++) {
                if (todos[i]["id"] === Number(variabel)) {
                    todos[i]["password"] = password
                }
            }
            render()
        }

        for (let i = 0; i < todos.length; i++) {
            if (todos[i]["id"] === Number(variabel)) {
                todos[i]["dueDate"] = name
                todos[i]["password"] = password
            }
        }
        render()
    }
    else if (item.classList[0] === "delete-btn") {
        deleteButton(event)
    }
    else if (item.classList[0] === "showpassword-btn") {
        console.log(item.parentElement.parentElement)
        item.parentElement.children[1].style.display = "none"
        item.parentElement.children[2].style.display = "block"
        item.parentElement.parentElement.children[0].style.display = "none"
        item.parentElement.parentElement.children[1].style.display = "block"
    }
    else if (item.classList[0] === "hidepassword-btn") {
        console.log(item.parentElement)
        item.parentElement.children[1].style.display = "block"
        item.parentElement.children[2].style.display = "none"
        item.parentElement.parentElement.children[0].style.display = "block"
        item.parentElement.parentElement.children[1].style.display = "none"
    }
}

// lengkapi function dibawah ini untuk menjalankan fungsi tombol done
function deleteButton(event) {
    const item = event.target;

    let array = []
    if (item.classList[0] === "delete-btn") {
        if (confirm('Are you sure you want to delete this thing from database?')) {
            console.log('Thing was saved to the database.');
            let variabel = item.parentElement.parentElement.children[2].innerText
            // var id = item.parentElement.children[6].innerText[variabel - 1]
            for (let i = 0; i < todos.length; i++) {
                if (todos[i]["id"] !== Number(variabel)) {
                    array.push(todos[i])
                }
            }
            item.remove()
            todos = array
        }
    }
    render()
}

// ABAIKAN code dibawah ini
function render() {
    todoList.innerHTML = ''
    // get todo list
    let todoListObj = todos
    // put all task to html
    for (let i = 0; i < todoListObj.length; i++) {
        // create div

        const todo = document.createElement("div");
        todo.classList.add("todo");

        //create le
        const todourl = document.createElement("li");
        todourl.innerText = `${todoListObj[i].task}`;
        todourl.classList.add("todo-url");
        todo.appendChild(todourl);

        // create li
        const newTodo = document.createElement("li");
        newTodo.innerText = `username:  ${todoListObj[i].dueDate} \n password :  ${todoListObj[i].password}`;
        newTodo.classList.add("todo-item");
        todo.appendChild(newTodo);

        //create id
        const todoid = document.createElement("li");
        todoid.innerText = `${todoListObj[i].id}`;
        todoid.classList.add("todo-id");
        todo.appendChild(todoid);

        const grouping = document.createElement("div");
        grouping.classList.add("grouping");
        //create delete button
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.classList.add("delete-btn");
        deleteButton.setAttribute("type", "submit");
        grouping.appendChild(deleteButton);

        //create showPassword button
        const showPassword = document.createElement("button");
        showPassword.innerHTML = "Show Password";
        showPassword.classList.add("showpassword-btn");
        showPassword.setAttribute("type", "submit");
        grouping.appendChild(showPassword);

        // create hide password
        const hidePassword = document.createElement("button");
        hidePassword.innerHTML = "Hide Password";
        hidePassword.classList.add("hidepassword-btn");
        hidePassword.setAttribute("type", "submit")
        grouping.appendChild(hidePassword);

        // create completed button
        const doneButton = document.createElement("button");
        doneButton.innerHTML = "Edit";
        doneButton.classList.add("edit-btn");
        doneButton.setAttribute("type", "submit")
        grouping.appendChild(doneButton);




        // append to todoList
        todoList.appendChild(todo);
        todo.appendChild(grouping)

    }
}

render()

// export for jest 🃏
document.filterTodos = filterTodos;
document.createObject = createObject;
document.addTodo = addTodo;
document.done = edit;
document.render = render;

