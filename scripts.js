const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const emptyText = document.getElementById("emptyText");
const filterButtons = document.querySelectorAll(".filter button");
const clearAllBtn = document.getElementById("clearAll");

let tasks = [];
let filter = "all";

addBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  const taskDate = dateInput.value;

  if (taskText === "" || taskDate === "") {
    alert("Isi tugas dan tanggal!");
    return;
  }

  tasks.push({
    text: taskText,
    date: taskDate,
    completed: false
  });

  taskInput.value = "";
  dateInput.value = "";
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";

  let filteredTasks = tasks;
  if (filter === "incomplete") {
    filteredTasks = tasks.filter(task => !task.completed);
  }

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task";

    li.innerHTML = `
      <span>${task.text} - ${task.date}</span>
      <button onclick="deleteTask(${index})">Delete</button>
    `;

    taskList.appendChild(li);
  });

  emptyText.style.display = tasks.length === 0 ? "block" : "none";
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    filter = btn.dataset.filter || "all";
    renderTasks();
  });
});

clearAllBtn.addEventListener("click", () => {
  tasks = [];
  renderTasks();
});