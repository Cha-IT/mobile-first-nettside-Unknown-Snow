document.addEventListener("DOMContentLoaded", () => {
    let order = JSON.parse(localStorage.getItem('order')) || [];
  
    // Hente og vise menyen dynamisk
    fetch('menu.json')
      .then(response => response.json())
      .then(data => {
        displayMenu(data);
      })
      .catch(error => console.error('Error:', error));
  
    function displayMenu(menuItems) {
      const menuList = document.getElementById('menu-list');
      menuItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price} NOK`;
        // Klikk på meny-elementet legger til varen i bestillingen
        li.addEventListener('click', () => {
          addToOrder(item);
        });
        menuList.appendChild(li);
      });
    }
  
    // Legg til en vare i bestillingen og lagre i LocalStorage
    function addToOrder(item) {
      order.push(item);
      updateOrderDisplay();
      localStorage.setItem('order', JSON.stringify(order));
    }
  
    // Oppdater visning av bestillingslisten
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
  
    // Fjern en vare fra bestillingen
    function removeFromOrder(index) {
      order.splice(index, 1);
      updateOrderDisplay();
      localStorage.setItem('order', JSON.stringify(order));
    }
  
    // Håndter innsending av bestillingen
    document.getElementById('submit-order').addEventListener('click', () => {
      // Eksempel på validering: sjekk at bestillingen ikke er tom
      if (order.length === 0) {
        alert("Din bestilling er tom!");
      } else {
        // Her kan du implementere en AJAX-kall eller annen logikk for å sende bestillingen
        alert("Bestilling sendt!");
        order = [];
        updateOrderDisplay();
        localStorage.removeItem('order');
      }
    });
  
    // Ved oppstart, vis en eventuell lagret bestilling
    updateOrderDisplay();
  });
  
  // Integrer Google Maps-kart
  function initMap() {
    const cafeLocation = { lat: 63.4305, lng: 10.3951 }; // Eksempelkoordinater for Trondheim
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: cafeLocation
    });
    new google.maps.Marker({
      position: cafeLocation,
      map: map
    });
  }
  