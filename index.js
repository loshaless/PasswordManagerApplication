// TODO LIST 
let todos = [
    
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
        let variabel = item.parentElement.children[6].innerText.length
        var id = item.parentElement.children[6].innerText[variabel - 1]
        
        var name = prompt("Please enter your name", "nama");
        if(name === ""){
            alert("nama tidak boleh kosong")
            return;
        }
        else if (name === null) {
            return;
        }

        var password = prompt("Please enter your password", "password");
        if(password === ""){
            alert("password tidak boleh kosong")
            return;
        }
        else if (password === null) {
            return;
        }

        for (let i = 0; i < todos.length; i++) {
            if (todos[i]["id"] === Number(id)) {
                todos[i]["dueDate"] = name
                todos[i]["password"] = password
            }
        }
        render()
    }
    else if (item.classList[0] === "delete-btn") {
        deleteButton(event)
    } else if (item.classList[0] === "showpassword-btn"){
        console.log(item.parentElement)
        item.parentElement.children[1].style.display = "block"
        item.parentElement.children[0].style.display = "none"
        item.parentElement.children[5].style.display = "block"
        item.parentElement.children[3].style.display = "none"
        
    }else if (item.classList[0] === "hidepassword-btn"){
        console.log(item.parentElement)
        item.parentElement.children[1].style.display = "none"
        item.parentElement.children[0].style.display = "block"
        item.parentElement.children[5].style.display = "none"
        item.parentElement.children[3].style.display = "block"
    }
}

// lengkapi function dibawah ini untuk menjalankan fungsi tombol done
function deleteButton(event) {
    const item = event.target;

    let array = []
    if (item.classList[0] === "delete-btn") {
        if (confirm('Are you sure you want to delete this thing from database?')) {
            console.log('Thing was saved to the database.');
            let variabel = item.parentElement.children[6].innerText.length
            var id = item.parentElement.children[6].innerText[variabel - 1]
            for (let i = 0; i < todos.length; i++) {
                if (todos[i]["id"] !== Number(id)) {
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
        newTodo.innerText = `${todoListObj[i].dueDate} -- ${todoListObj[i].password}`;
        newTodo.classList.add("todo-item");
        todo.appendChild(newTodo);

        //create delete button
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.classList.add("delete-btn");
        deleteButton.setAttribute("type", "submit");
        todo.appendChild(deleteButton);

        //create showPassword button
        const showPassword = document.createElement("button");
        showPassword.innerHTML = "Show Password";
        showPassword.classList.add("showpassword-btn");
        showPassword.setAttribute("type", "submit");
        todo.appendChild(showPassword);

        // create completed button
        const doneButton = document.createElement("button");
        doneButton.innerHTML = "Edit";
        doneButton.classList.add("edit-btn");
        doneButton.setAttribute("type", "submit")
        todo.appendChild(doneButton);

        // create hide password
        const hidePassword = document.createElement("button");
        hidePassword.innerHTML = "Hide Password";
        hidePassword.classList.add("hidepassword-btn");
        hidePassword.setAttribute("type", "submit")
        todo.appendChild(hidePassword);

        //create id
        const todoid = document.createElement("li");
        todoid.innerText = `${todoListObj[i].id}`;
        todoid.classList.add("todo-id");
        todo.appendChild(todoid);

        // append to todoList
        todoList.appendChild(todo);

    }
}

render()

// export for jest 🃏
document.filterTodos = filterTodos;
document.createObject = createObject;
document.addTodo = addTodo;
document.done = edit;
document.render = render;

