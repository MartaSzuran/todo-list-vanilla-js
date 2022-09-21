export let tasks = [];

let id = 0;

export function createNewTask(value) {
  let task = {
    id: ++id,
    text: value,
    isDone: false,
  };
  tasks.push(task);
  console.log(tasks);
}
