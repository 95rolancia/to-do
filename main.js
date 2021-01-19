const content = document.querySelector(".content");
const addbarBtn = document.querySelector(".addbar__btn");
const addbarInput = document.querySelector(".addbar__input");

addbarBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const addbarInputValue = addbarInput.value;
  const newTask = document.createElement("li");
  newTask.setAttribute("class", "item");

  const newTaskName = document.createElement("span");
  newTaskName.textContent = addbarInputValue;

  const newTaskDelete = document.createElement("i");
  newTaskDelete.setAttribute("class", "fas fa-trash-alt");

  newTaskDelete.addEventListener("click", (e) => {
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
  });

  newTask.appendChild(newTaskName);
  newTask.appendChild(newTaskDelete);

  newTask.addEventListener("click", (e) => {
    if (e.target.nodeName !== "SPAN") {
      return;
    }
    if (e.target.style.textDecoration === "line-through") {
      e.target.style.textDecoration = "";
    } else {
      e.target.style.textDecoration = "line-through";
    }
  });

  content.appendChild(newTask);
  addbarInput.value = "";
  addbarInput.focus();
});
