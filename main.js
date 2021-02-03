const items = document.querySelector(".items");
const addbarBtn = document.querySelector(".addbar__btn");
const addbarInput = document.querySelector(".addbar__input");
let id = 0;

function onAdd() {
  const text = addbarInput.value;
  if (text === "") {
    addbarInput.focus();
    return;
  }

  const newItem = createItem(text);
  items.appendChild(newItem);
  newItem.scrollIntoView();
  addbarInput.value = "";
  addbarInput.focus();
}

function createItem(text) {
  const itemRow = document.createElement("li");
  itemRow.setAttribute("class", "item__row");
  itemRow.setAttribute("data-id", id);

  itemRow.innerHTML = `
      <div class="item">
        <span class="item__name">${text}</span>
        <button class="item__delete">
           <i class="fas fa-trash-alt" data-id="${id}"></i>
        </button>
     </div>
     <div class="item__divider"></div>
  `;
  id++;
  return itemRow;
}
addbarBtn.addEventListener("click", (event) => {
  event.preventDefault();
  onAdd();
});

items.addEventListener("click", (e) => {
  const target = e.target;
  const id = target.dataset.id;
  if (id && target.nodeName === "I") {
    const id = e.target.dataset.id;
    const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
    toBeDeleted.remove();
    return;
  }

  if (target.nodeName === "SPAN") {
    if (e.target.style.textDecoration === "line-through") {
      e.target.style.textDecoration = "";
    } else {
      e.target.style.textDecoration = "line-through";
    }
    return;
  }
});
