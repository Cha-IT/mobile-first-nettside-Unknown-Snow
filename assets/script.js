document.addEventListener("DOMContentLoaded", () => {
  let order = JSON.parse(localStorage.getItem('order')) || [];

  fetch('menu.json')
    .then(response => response.json())
    .then(data => {
      displayMenu(data);
    })
    .catch(error => console.error('Error:', error));

  function displayMenu(menuItems) {
    const menuContainer = document.getElementById('menu-container');
    menuItems.forEach(item => {
      const itemContainer = document.createElement('div');
      itemContainer.className = 'menu-item';

      if (item.img) {
        const img = document.createElement('img');
        img.src = item.img;
        img.alt = item.name;
        itemContainer.appendChild(img);
      }

      const title = document.createElement('h3');
      title.textContent = `${item.name} - ${item.price} NOK`;
      itemContainer.appendChild(title);

      if (item.description) {
        const description = document.createElement('p');
        description.textContent = item.description;
        itemContainer.appendChild(description);
      }

      const addButton = document.createElement('button');
      addButton.textContent = "Legg i handlekurven";
      addButton.addEventListener('click', () => {
        addToOrder(item);
      });
      itemContainer.appendChild(addButton);

      menuContainer.appendChild(itemContainer);
    });
  }

  function addToOrder(item) {
    order.push(item);
    updateOrderDisplay();
    localStorage.setItem('order', JSON.stringify(order));
  }

  function updateOrderDisplay() {
    const orderList = document.getElementById('order-list');
    orderList.innerHTML = "";
    order.forEach((item, index) => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - ${item.price} NOK`;

      const removeBtn = document.createElement('button');
      removeBtn.textContent = "Fjern";
      removeBtn.addEventListener('click', () => {
        removeFromOrder(index);
      });
      li.appendChild(removeBtn);
      orderList.appendChild(li);
    });
  }

  function removeFromOrder(index) {
    order.splice(index, 1);
    updateOrderDisplay();
    localStorage.setItem('order', JSON.stringify(order));
  }

  document.getElementById('submit-order').addEventListener('click', () => {
    if (order.length === 0) {
      alert("Din bestilling er tom!");
    } else {
      alert("Bestilling sendt!");
      order = [];
      updateOrderDisplay();
      localStorage.removeItem('order');
    }
  });

  updateOrderDisplay();
});
