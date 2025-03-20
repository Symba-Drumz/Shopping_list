const input = document.getElementById('itemInput');
const addBtn = document.getElementById('addBtn');
const clearBtn = document.getElementById('clearBtn');
const list = document.getElementById('shoppingList');

let items = JSON.parse(localStorage.getItem('shoppingList')) || [];

function renderList() {
  list.innerHTML = '';
  items.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = item.purchased ? 'purchased' : '';

    const span = document.createElement('span');
    span.textContent = item.name;
    span.style.flex = '1';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => {
      const newName = prompt('Edit item:', item.name);
      if (newName) {
        item.name = newName;
        saveAndRender();
      }
    };

    span.onclick = () => {
      item.purchased = !item.purchased;
      saveAndRender();
    };

    li.append(span, editBtn);
    list.appendChild(li);
  });
}

function saveAndRender() {
  localStorage.setItem('shoppingList', JSON.stringify(items));
  renderList();
}

addBtn.onclick = () => {
  const value = input.value.trim();
  if (value) {
    items.push({ name: value, purchased: false });
    input.value = '';
    saveAndRender();
  }
};

clearBtn.onclick = () => {
  if (confirm('Are you sure you want to clear the list?')) {
    items = [];
    saveAndRender();
  }
};

renderList();
