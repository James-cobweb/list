const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const toggleThemeBtn = document.getElementById("toggleThemeButton");

document.addEventListener("DOMContentloaded" , loadTasks);
toggleThemeBtn.addEventListener("click", toggleTheme);
addTaskBtn.addEventListener("click", addTask)
taskList.addEventListener("click", handleTaskClick);

function addTask(){
    const taskText = taskInput.value.trim();
    if(!taskText){
        alert("please enter a task")
        return;
    }
    const li = createTaskElement(taskText);
    taskList.appendChild(li);
    saveTasks();
    taskInput.value = " ";
}

function createTaskElement(taskText, completed = false){
    const li = document.createElement("li");
        li.className = completed ? "completed" : " ";
        const span = document.createElement("span")
        span.className  = "task-text"
        span.textContent = taskText;

        const editButton = document.createElement("button")
        editButton.className = "edit-btn"
        editButton.textContent = "Edit"

        const deleteButton = document.createElement("button")
        deleteButton.className = "delete-btn"
        deleteButton.textContent = "Delete"

        li.appendChild(span);
        li.appendChild(editButton)
        li.appendChild(deleteButton)
    return li;
}

function handleTaskClick(e){
    const taskItem = e.target.closest("li")
    if (!taskItem)return;
    if
    (e.target.classList.contains("delete-btn")){
        taskItem.remove();
        saveTasks();
    }else if (e.target.classList.contains("edit-btn")){
        editTask(taskItem);
    }else{
        taskItem.classList.toggle("completed");
        saveTasks();
    }
}

function editTask(taskItem){
    console.log("task item recieved:", taskItem)
    const taskTextElement= taskItem.querySelector(".task-text");
     if(!taskTextElement){
        console.error("task-text element not found in task item")
        return;
     }
    const editModal = document.getElementById("editModal");
    const editInput = document.getElementById("editInput");
    if (!editInput){
        console.log("edit input not found");
        return;
    }

    editModal.style.display = "flex";
    editInput.value = taskTextElement.textContent;

    const saveButton = document.getElementById("saveButton");

     saveButton.onclick = function(){
        const newTaskText = editInput.value.trim();
        if (newTaskText) {
            taskTextElement.textContent = newTaskText;
            saveTasks();
            editModal.style.display="none";
        }else{
            alert("enter a valid task")
        }
        
    };

    const cancelButton = document.getElementById("cancelButton");

     cancelButton.onclick = function ()  {
        editModal.style.display = "none";
    };
}

function saveTasks(){
    const tasks = [...taskList.children].map ((task)=>({
        text:
        task.querySelector(".task-text").textContent,
        completed:
        task.classList.contains("completed"),
    }));
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("task saved to local storage")
}

function loadTasks(){
    const tasks = JSON.parse(localStorage.getItem("tasks"))|| [];
    console.log("loaded task from storage", tasks);

    if (tasks.length === 0)
    tasks.forEach((task)=>{
        const li = createTaskElement(task.text, task.completed);
        taskList.appendChild(li);
    });

    if (localStorage.getItem("theme") === "dark"){
        document.body.classList.add("dark");
        console.log("dark theme applied")
    }
}

function toggleTheme(){
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark")? "dark" : "light");
}
