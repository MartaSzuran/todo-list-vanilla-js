import "./style.css";
import { createNewTask, tasks } from "./tasks.js";

document.querySelector("#app").innerHTML = `
  <div>
    <form class='tasks-form' id='user-input'>
      <input type='text' id='todo-input'></input>
      <button type='submit'>Add new task</button>
    </form>
    <div class='all-tasks' id='all-tasks'>
      <div class='toDo' id='to-do'></div>
      <div class='done' id='done'></div>
    </div>
  </div>
`;

window.addEventListener("toDo", () => {
  const chosenElement = document.getElementById();
});

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
      checkIfTasksIsDone(task, index);
    });
  }
}

function checkIfTasksIsDone(task, index) {
  if (!task.isDone) {
    let toDoDiv = document.createElement("div");
    toDoDiv.setAttribute("draggable", true);
    toDoDiv.innerHTML = `
    <div id='task'>${index + 1}. ${task.text}</div>
    `;
    let toDoList = document.getElementById("to-do");
    toDoList.appendChild(toDoDiv);
    return;
  }
  let doneDiv = document.createElement("div");
  doneDiv.innerText = task.text;
  let doneList = document.getElementById("to-do");
  doneList.appendChild(doneDiv);
}

function clearTodos() {
  let toDoDiv = document.getElementById("to-do");
  while (toDoDiv.firstChild) {
    toDoDiv.removeChild(toDoDiv.lastChild);
  }
}
