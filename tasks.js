export let ifTaskAlreadyExists = false;

export function createNewTask(value) {
  let task = {
    text: value,
    isDone: false,
  };
  checkIfTaskAlreadyExists(task);
  if (!ifTaskAlreadyExists) {
    setNewTaskInLocalStorage(task);
  }
}

function setNewTaskInLocalStorage(task) {
  localStorage.setItem(
    "currentTasks",
    JSON.stringify([
      ...JSON.parse(localStorage.getItem("currentTasks") || "[]"),
      task,
    ])
  );
}

function checkIfTaskAlreadyExists(task) {
  const currentTasks = Array.from(
    JSON.parse(localStorage.getItem("currentTasks"))
  );
  currentTasks.map((t) => {
    if (t.text === task.text) {
      ifTaskAlreadyExists = true;
    }
  });
}

export function updateTasksInLocalStorage(tasks) {
  localStorage.setItem("currentTasks", JSON.stringify(tasks));
}
