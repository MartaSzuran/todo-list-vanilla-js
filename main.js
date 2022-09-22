import "./style.css";
import { createNewTask, tasks } from "./tasks.js";

document.querySelector("#app").innerHTML = `
  <div>
    <form class='tasks-form' id='user-input'>
      <input type='text' id='todo-input'></input>
      <button type='submit'>Add new task</button>
    </form>
    <div class='all-tasks'>
      <div class='todo-column'>TODO</div>
      <div class='done-column'>DONE</div>
    </div>
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

function assignTaskToDiv(task, index) {
  if (!task.isDone) {
    const div = addTaskToDiv(task, "to-do");
    div.addEventListener("dragstart", (ev) => {
      ev.dataTransfer.setData("taskId", task.id);
    })
  } else {
    addTaskToDiv(task, "done");
  }
}

function addTaskToDiv(task, divId) {
  let taskDiv = document.createElement("div");
  taskDiv.id = `task${task.id}`;
  taskDiv.draggable = true;
  taskDiv.innerText = `${task.text}`;
  let doneList = document.getElementById(divId);
  doneList.appendChild(taskDiv);
  return taskDiv
}

function clearTodos() {
  removeAllChildrenFrom("to-do")
}

function clearDone() {
  removeAllChildrenFrom("done")
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
  const found = tasks.find(t => t.id === id);
  if (found) {
    found.isDone = true;
    render();
  }
}
