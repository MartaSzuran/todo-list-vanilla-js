import "./style.css";
import { createNewTask, tasks } from "./tasks.js";

document.querySelector("#app").innerHTML = `
  <div>
    <form class='tasks-form' id='user-input'>
      <input type='text' id='todo-input'></input>
      <button type='submit'>Add new task</button>
    </form>
    <div class='all-tasks' id='all-tasks'>
      <div class='todo-column' id='todo'></div>
      <div class='done-column' id='done'></div>
    </div>
  </div>
`;

const doneColumn = document.getElementById("done");
doneColumn.addEventListener("dragover", onDragOver);
doneColumn.addEventListener("drop", onDrop);
const todoColumn = document.getElementById("todo");
todoColumn.addEventListener("dragover", onDragOver);
todoColumn.addEventListener("drop", onDrop);

document.getElementById("user-input").addEventListener("submit", (event) => {
  event.preventDefault();
  let userInput = document.getElementById("todo-input");
  if (userInput.value) {
    createNewTask(userInput.value);
    render();
    userInput.value = "";
    document.getElementById("todo-input").focus();
  }
});

function render() {
  clearTodos();
  clearDone();
  if (tasks.length > 0) {
    tasks.map((task, index) => {
      assignTaskToDiv(task, index);
    });
  }
}

function assignTaskToDiv(task) {
  if (!task.isDone) {
    const div = addTaskToDiv(task, "todo");
    div.addEventListener("dragstart", (ev) => {
      ev.dataTransfer.setData("taskId", task.id);
    });
  } else {
    const div = addTaskToDiv(task, "done");
    div.addEventListener("dragstart", (ev) => {
      ev.dataTransfer.setData("taskId", task.id);
    });
  }
}

function addTaskToDiv(task, divId) {
  let taskDiv = document.createElement("div");
  taskDiv.id = `task${task.id}`;
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
  const found = tasks.find((task) => task.id === id);
  if (found) {
    if (found.isDone) {
      found.isDone = false;
      render();
      return;
    }
    found.isDone = true;
    render();
  }
}
