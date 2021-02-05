const items = document.querySelector(".items");
const addbarBtn = document.querySelector(".addbar__btn");
const addbarInput = document.querySelector(".addbar__input");
const addbarForm = document.querySelector(".addbar__form");

const datas = "datas";
let savedDatas = {};

function onAdd(e) {
  e.preventDefault();
  const text = addbarInput.value;
  if (text === "") {
    addbarInput.focus();
    return;
  }
  savedDatas.id++;
  savedDatas.list.push({ id: savedDatas.id, name: text });
  save();
  const newItem = createItem(text, savedDatas.id);
  paintItem(newItem);
  newItem.scrollIntoView();
  addbarInput.value = "";
}

function paintItem(item) {
  items.appendChild(item);
}

function createItem(text, id) {
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
  return itemRow;
}

items.addEventListener("click", (e) => {
  const target = e.target;
  const id = target.dataset.id;
  if (id && target.nodeName === "I") {
    savedDatas.list = savedDatas.list.filter((item) => item.id != id);
    const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
    toBeDeleted.remove();
    save();
    return;
  }

  if (target.nodeName === "SPAN") {
    if (target.style.textDecoration === "line-through") {
      target.style.textDecoration = "";
    } else {
      target.style.textDecoration = "line-through";
    }
    return;
  }
});

function save() {
  localStorage.setItem(datas, JSON.stringify(savedDatas));
}

function load() {
  savedDatas = JSON.parse(localStorage.getItem(datas)) || {
    id: 0,
    list: [],
  };
  id = savedDatas.id;
  console.log(savedDatas);
  if (isEmptyObject(savedDatas)) {
    console.log("저장된 데이터가 없습니다.");
    return;
  }

  restore();
}

function isEmptyObject(obj) {
  return !Object.keys(obj).length && obj.constructor === Object;
}

function restore() {
  savedDatas.list.forEach((savedItem) => {
    const item = createItem(savedItem.name, savedItem.id);
    paintItem(item);
  });
}

function start() {
  load();
  addbarForm.addEventListener("submit", (e) => onAdd(e));
}

start();
