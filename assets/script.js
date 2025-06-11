const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

let tasks = [];

//Piccolo extra, rimuovi i commenti nel codice per non perdere il contenuto delle liste
/*let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const saveTasks = function () {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};*/

const updateTaskList = function () {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.toggle("completed", task.completed);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onclick = () => toggleCompletion(index);

    const text = document.createElement("span");
    text.textContent = task.text;

    const delBtn = document.createElement("button");
    delBtn.innerHTML = '<i class="fas fa-trash"></i>';
    delBtn.classList.add("delete");
    delBtn.onclick = () => deleteTask(index);

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(delBtn);

    taskList.appendChild(li);
  });
};

const addTask = function () {
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = "";
    //saveTasks();
    updateTaskList();
  }
};

const deleteTask = function (index) {
  tasks.splice(index, 1);
  //saveTasks();
  updateTaskList();
};

const toggleCompletion = function (index) {
  tasks[index].completed = !tasks[index].completed;
  //saveTasks();
  updateTaskList();
};

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

updateTaskList();