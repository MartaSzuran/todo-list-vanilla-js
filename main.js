import "./style.css";
import { createNewTask, tasks } from "./tasks.js";

document.querySelector("#app").innerHTML = `
  <div>
    <form class='tasks-form' id='user-input'>
      <input type='text' id='todo-input'></input>
      <button type='submit'>Add new task</button>
    </form>
    <div class='all-tasks' id='all-tasks'>
      <div class='todo-column' id='to-do'></div>
      <div class='done-column' id='done'></div>
    </div>
  </div>
`;

const doneColumn = document.getElementById("done");
doneColumn.addEventListener("dragover", onDragOver);
doneColumn.addEventListener("drop", onDrop);

document.getElementById("user-input").addEventListener("submit", (event) => {
  event.preventDefault();
  let userInput = document.getElementById("todo-input");
  if (userInput.value) {
    createNewTask(userInput.value);
    render();
    userInput.value = "";
  }
});

function render() {
  clearTodos();
  if (tasks.length > 0) {
    tasks.map((task, index) => {
      checkIfTasksAreDone(task, index);
    });
  }
}

function checkIfTasksAreDone(task, index) {
  if (!task.isDone) {
    let toDoDiv = document.createElement("div");
    toDoDiv.innerHTML = `
    <div id='${task.id}' draggable='true'>${task.text}</div>
    `;
    toDoDiv.addEventListener("dragstart", onDragStart);
    let toDoList = document.getElementById("to-do");
    toDoList.appendChild(toDoDiv);
    return;
  }
  let doneDiv = document.createElement("div");
  doneDiv.innerText = `
    <div id='${task.id}' draggable='true'>${task.text}</div>
    `;
  let doneList = document.getElementById("to-do");
  doneList.appendChild(doneDiv);
}

function clearTodos() {
  let toDoDiv = document.getElementById("to-do");
  while (toDoDiv.firstChild) {
    toDoDiv.removeChild(toDoDiv.lastChild);
  }
}

function onDragStart(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function onDragOver(ev) {
  ev.preventDefault();
}

function onDrop(ev) {
  const data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}
