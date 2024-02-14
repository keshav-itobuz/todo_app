import { taskCreator } from "./taskCreator.js";
let taskList = document.getElementById('task');
const newTask = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
let storedTask = JSON.parse(localStorage.getItem('taskList') || '[]');
let buttonContainer = document.getElementById('buttonSection');

let prevActiveButton = document.querySelector('.allButton')

storedTask.forEach((item) => {
    taskCreator(item, item.id);
})


addTaskButton.addEventListener('click', (item) => {
    storedTask = JSON.parse(localStorage.getItem('taskList') || '[]');
    let check;
    for (let i = 0; i < storedTask.length; i++) {
        if (newTask.value.localeCompare(storedTask[i].task) === 0) {
            check = 0;
            break;
        }
    }
    if (newTask.value !== "") {
        alert("Repeated task spotted!!!")
        newTask.value = "";
    }
    else if (check !== 0) { }
    else {
        let uniqueId = new Date().getTime();
        const createdTask = {
            id: uniqueId,
            task: newTask.value,
            status: "active",
        };
        taskCreator(createdTask, uniqueId)
        storedTask.push(createdTask);
        localStorage.setItem('taskList', JSON.stringify(storedTask));
        newTask.value = "";
    }
})

newTask.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        addTaskButton.click();
    }
})

taskList.addEventListener('click', (e) => {
    storedTask = JSON.parse(localStorage.getItem('taskList'));
    if (e.target.className.includes("deleteTask")) {
        let dataAttribute = e.target.dataset.delete_item;
        storedTask = storedTask.filter((item) => (item.id).toString() !== (dataAttribute).toString());
        localStorage.setItem('taskList', JSON.stringify(storedTask));
        let obj = document.getElementById(dataAttribute);
        obj.remove();
    }
    if (e.target.className.includes("completedTask")) {
        let taskId = e.target.dataset.completed_item;
        let check = storedTask.find((item) => (item.id).toString() === (taskId).toString());
        if (e.target.checked === true) {
            check.status = "completed";
        }
        else {
            check.status = "active";
        }
        localStorage.setItem('taskList', JSON.stringify(storedTask));
        // taskList.innerHTML="";
        // storedTask.forEach((item) => {
        //     taskCreator(item, item.id);
        // })
    }
})

buttonContainer.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') {
        return;
    }
    storedTask = JSON.parse(localStorage.getItem('taskList'));
    prevActiveButton.classList.remove('active')
    e.target.classList.add('active');
    prevActiveButton = e.target;

    if (e.target.className.includes("clearButton")) {
        storedTask = storedTask.filter((item) => item.status === "active");
        localStorage.setItem('taskList', JSON.stringify(storedTask));
        taskList.innerText = "";
        storedTask.forEach((item) => {
            taskCreator(item, item.id);
        })
    }
    if (e.target.className.includes("completedButton")) {
        storedTask = storedTask.filter((item) => item.status === "completed");
        taskList.innerText = "";
        storedTask.forEach((item) => {
            taskCreator(item, item.id);
        })
    }
    if (e.target.className.includes("activeButton")) {
        storedTask = storedTask.filter((item) => item.status === "active");
        taskList.innerText = "";
        storedTask.forEach((item) => {
            taskCreator(item, item.id);
        })
    }
    if (e.target.className.includes("allButton")) {
        taskList.innerText = "";
        storedTask.forEach((item) => {
            taskCreator(item, item.id);
        })
    }
})

