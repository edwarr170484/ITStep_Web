function checkTask(event) {
  let button = event.target.parentElement;

  if (confirm("Хотите отметить задачу как выполненную?")) {
    if (event.target.localName == "i") {
      button.parentElement.previousElementSibling.style.textDecoration =
        "line-through";
      button.remove();
    } else {
      button.previousElementSibling.style.textDecoration = "line-through";
    }
  }
}

function addNewTask(event) {
  let list = document.querySelector(".tasks");
  let tasks = document.getElementsByClassName("task");
  let input = document.querySelector('input[name="todo-text"]');

  list.insertAdjacentHTML(
    "beforeend",
    `<div class="task">
      <span>${tasks.length + 1}. ${input.value}</span>
      <div class="task-tools">
        <button class="task-check" title="Пометить как выполненную" onclick="checkTask(event)">
          <i class="fas fa-check"></i>
        </button>
        <button class="task-remove" title="Удалить задачу" onclick="removeTask(event)">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  `
  );
}

function removeTask(event) {
  let button = event.target.parentElement;

  if (confirm("Вы действительно хотите удалить задачу?")) {
    if (event.target.localName == "i") {
      button.parentElement.parentElement.remove();
    } else {
      button.parentElement.remove();
    }
  }
}
