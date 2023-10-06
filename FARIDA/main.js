//***************** create tasks *****************//
class Task {
    constructor(name, status) {
        this.name = name;
        this.status = 'uncomplete';
    }
}
//***************** tasks storage *****************//
class Store {
    static gettodoList() {
        let todoList;
        return todoList = JSON.parse(localStorage.getItem('todoList')) || [];
    } 
}

let todos = Store.gettodoList();
let taskContainer = document.querySelector(".tasks-container");
let taskID,
    editable = false;

class ToDoList {
    static showTask() {
        let task = "";
        //test if there is data in local storage then create task
        if (todos) {
            todos.forEach((todo, id) => {
                let completed = todo.status == "completed" ? "checked" : "";
                task += `<div class="task">
                                    <div id="${id}">
                                    <div class="box" >
                                        <input onclick="ToDoList.checkTask(this)" onChecked="ToDoList.hello()" type="checkbox" id="${id}" ${completed}>
                                        <p class="${completed}" onclick="ToDoList.editTask(${id}, '${todo.name}')">${todo.name}</p>
                                    </div>
                                        <span onclick="ToDoList.deleteTask(${id})" class="clear">Del</span>                                       
                                    </div>
                        </div>`;
            });
        }
        taskContainer.innerHTML = task || `<span class="no-tasks">There are no tasks</span>`;
    }

    //delete task
    static deleteTask(Id) {
        todos.splice(Id, 1);
        localStorage.setItem("todoList", JSON.stringify(todos));
        ToDoList.showTask();
    }

    // change status of task (complete/uncomplete)
    static checkTask(selectedTask) {
            let taskName = selectedTask.parentElement.lastElementChild;
            if (selectedTask.checked) {
                taskName.classList.add("checked");
                todos[selectedTask.id].status = "completed";
            } else {
                taskName.classList.remove("checked");
                todos[selectedTask.id].status = "uncomplete";
            }
            localStorage.setItem("todoList", JSON.stringify(todos));
        }
        //edit task
    static editTask(taskId, textName) {
        taskID = taskId;
        editable = true;
        taskInput.value = textName;
        taskInput.focus();
        taskInput.classList.add("active");
    }

}
ToDoList.showTask();

//create new task
let taskInput = document.querySelector(".add-task input"),
    plusBtn = document.querySelector(".add-task .add");

plusBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let newTask = taskInput.value;
    if (newTask == ""){
        alert("Empty Task, Please write Something to do");
    }else {
        if (!editable) {
            todos = todos;
            let taskText = new Task(newTask, "uncomplete")
            todos.push(taskText);
        }
        else {
            editable = false;
            todos[taskID].name = newTask;
        }

        taskInput.value = "";
        localStorage.setItem("todoList", JSON.stringify(todos));
        ToDoList.showTask();
    }
});

//count completed tasks
let countertasks = document.querySelector(".count-complete");
let allchecked = document.querySelectorAll(".checked");