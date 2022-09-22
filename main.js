import "./style.css";
import {
  createNewTask,
  updateTasksInLocalStorage,
  ifTaskAlreadyExists,
} from "./tasks.js";

document.querySelector("#app").innerHTML = `
  <div>
    <form class='tasks-form' id='user-input'>
      <input type='text' id='todo-input'></input>
      <button type='submit'>Add new task</button>
    </form>
    <div class='headers'>
      <h1>TODO</h1>
      <h1>DONE</h1>
    </div>
    <div class='all-tasks' id='all-tasks'>
      <div class='todo-column' id='todo'></div>
      <div class='done-column' id='done'></div>
    </div>
    <div class='info' id='info'></div>
  </div>
`;

let tasksFromLocalStorage = JSON.parse(localStorage.getItem("currentTasks"));
let tasks = null;
if (tasksFromLocalStorage) {
  render();
}

document.getElementById("user-input").addEventListener("submit", (event) => {
  event.preventDefault();
  let userInput = document.getElementById("todo-input");
  if (userInput.value) {
    createNewTask(userInput.value);
    addInfoDiv();
    tasksFromLocalStorage = JSON.parse(localStorage.getItem("currentTasks"));
    render();
    userInput.value = "";
    document.getElementById("todo-input").focus();
  }
});

function render() {
  if (tasksFromLocalStorage !== null) {
    tasks = Array.from(tasksFromLocalStorage);
  }
  clearTodos();
  clearDone();
  tasks.map((task, index) => {
    assignTaskToDiv(task, index);
  });
}

function addInfoDiv() {
  if (ifTaskAlreadyExists) {
    const information = document.getElementById("info");
    information.innerHTML = "This task is already on the list";
    setTimeout(() => (information.innerHTML = ""), 2000);
  }
}

function assignTaskToDiv(task, index) {
  if (!task.isDone) {
    const div = addTaskToDiv(task, "todo", index);
    div.addEventListener("dragstart", (ev) => {
      ev.dataTransfer.setData("taskId", index);
    });
  } else {
    const div = addTaskToDiv(task, "done", index);
    div.addEventListener("dragstart", (ev) => {
      ev.dataTransfer.setData("taskId", index);
    });
  }
}

function addTaskToDiv(task, divId, index) {
  let taskDiv = document.createElement("div");
  taskDiv.id = `task${index}`;
  taskDiv.classList = "task";
  taskDiv.draggable = true;
  taskDiv.innerText = `${task.text}`;
  let taskList = document.getElementById(divId);
  taskList.appendChild(taskDiv);
  return taskDiv;
}

function clearTodos() {
  removeAllChildrenFrom("todo");
}

function clearDone() {
  removeAllChildrenFrom("done");
}

function removeAllChildrenFrom(id) {
  let toDoDiv = document.getElementById(id);
  while (toDoDiv.firstChild) {
    toDoDiv.removeChild(toDoDiv.lastChild);
  }
}

function onDragOver(ev) {
  ev.preventDefault();
}

function onDrop(ev) {
  const id = Number(ev.dataTransfer.getData("taskId"));
  const found = tasks.find((_, index) => index === id);
  if (found) {
    if (found.isDone) {
      found.isDone = false;
      updateTasksInLocalStorage(tasks);
      render();
      return;
    }
    found.isDone = true;
    updateTasksInLocalStorage(tasks);
    render();
  }
}

const doneColumn = document.getElementById("done");
doneColumn.addEventListener("dragover", onDragOver);
doneColumn.addEventListener("drop", onDrop);
const todoColumn = document.getElementById("todo");
todoColumn.addEventListener("dragover", onDragOver);
todoColumn.addEventListener("drop", onDrop);
