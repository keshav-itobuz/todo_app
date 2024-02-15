import { taskCreator } from "./taskCreator.js";
let taskList = document.getElementById('taskList');
const newTask = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
let storedTask = JSON.parse(localStorage.getItem('taskList') || '[]');
let buttonContainer = document.getElementById('buttonSection');
let prevActiveButton = document.querySelector('.allButton')
let allActiveCompleted = "all";

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
    if (check === 0) {
        alert("Repeated task spotted!!!")
        newTask.value = "";
    }
    else if (newTask.value === "") { }
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
        const card = document.getElementById(taskId);
        const heading = card.getElementsByTagName("h4");
        if (e.target.checked === true) {
            check.status = "completed";
            heading[0].style.textDecorationLine = "line-through";
            if (allActiveCompleted === "active") {
                taskList.removeChild(card);
            }
        }
        else {
            check.status = "active";
            heading[0].style.textDecorationLine = "none";
            if (allActiveCompleted === "completed") {
                taskList.removeChild(card);
            }
        }
        localStorage.setItem('taskList', JSON.stringify(storedTask));
    }
})

buttonContainer.addEventListener('click', (e) => {
    storedTask = JSON.parse(localStorage.getItem('taskList'));
    prevActiveButton.classList.remove('active')
    e.target.classList.add('active');
    prevActiveButton = e.target;
    if (e.target.tagName !== 'BUTTON') {
        return;
    }
    if (e.target.className.includes("clearButton")) {
        storedTask = storedTask.filter((item) => item.status === "active");
        localStorage.setItem('taskList', JSON.stringify(storedTask));
        const allButton = document.getElementById('allButton');
        allButton.click();
    }
    if (e.target.className.includes("completedButton")) {
        allActiveCompleted = "completed";
        storedTask = storedTask.filter((item) => item.status === "completed");
        taskList.innerText = "";
        storedTask.forEach((item) => {
            taskCreator(item, item.id);
        })
    }
    if (e.target.className.includes("activeButton")) {
        allActiveCompleted = "active";
        storedTask = storedTask.filter((item) => item.status === "active");
        taskList.innerText = "";
        storedTask.forEach((item) => {
            taskCreator(item, item.id);
        })
    }
    if (e.target.className.includes("allButton")) {
        allActiveCompleted = "all";
        taskList.innerText = "";
        storedTask.forEach((item) => {
            taskCreator(item, item.id);
        })
    }
})