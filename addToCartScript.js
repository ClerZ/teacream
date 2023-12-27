// Your JavaScript code

const itemDetails = {
  'Avocado': {
    '16 oz': { price: 5.99, image: 'classics/cheesecake.png' },
    '22 oz': { price: 7.99, image: 'classics/cheesecake.png' }
  },

  'Honey Dew': {
    '16 oz': { price: 5.99, image: 'classics/cheesecake.png' },
    '22 oz': { price: 7.99, image: 'classics/cheesecake.png' }
  },

  //CLASSIC MILKTEA
  'Wintermellon': {
    '16 oz': { price: 5.99, image: 'classics/wintermelon.png' },
    '22 oz': { price: 7.99, image: 'classics/wintermelon.png' }
  },

  'Okinawa': {
    '16 oz': { price: 5.99, image: 'classics/okinawa.png' },
    '22 oz': { price: 7.99, image: 'classics/okinawa.png' }
  },

  'Cheesecake': {
    '16 oz': { price: 5.99, image: 'classics/cheesecake.png' },
    '22 oz': { price: 7.99, image: 'classics/cheesecake.png' }
  },

  'Cookies N Cream': {
    '16 oz': { price: 5.99, image: 'classics/cookiesNcream.png' },
    '22 oz': { price: 7.99, image: 'classics/cookiesNcream.png' }
  },

  'Hokkaido': {
    '16 oz': { price: 5.99, image: 'classics/hokkaido.png' },
    '22 oz': { price: 7.99, image: 'classics/hokkaido.png' }
  },

  'Vanilla': {
    '16 oz': { price: 5.99, image: 'classics/vanilla.png' },
    '22 oz': { price: 7.99, image: 'classics/vanilla.png' }
  },

  'Salted Caramel': {
    '16 oz': { price: 5.99, image: 'classics/saltedCaramel.png' },
    '22 oz': { price: 7.99, image: 'classics/saltedCaramel.png' }
  },

  'Thai': {
    '16 oz': { price: 5.99, image: 'classics/thai.png' },
    '22 oz': { price: 7.99, image: 'classics/thai.png' }
  },

  'White Rabbit': {
    '16 oz': { price: 5.99, image: 'classics/whiteRabbit.png' },
    '22 oz': { price: 7.99, image: 'classics/whiteRabbit.png' }
  },

  
  
};

function calculateTotalPrice(flavor, size, quantity) {
  return itemDetails[flavor][size].price * quantity;
}

function addToCart(flavor, size) {
  const cartItemsContainer = document.getElementById('cartItems');
  const existingCartItem = findCartItem(flavor, size);

  if (existingCartItem) {
    updateQuantity(existingCartItem, 1);
    console.log("After updateQuantity:", existingCartItem.quantity);
} else {
    const cartItem = createCartItem(flavor, size, 1);
    cartItemsContainer.appendChild(cartItem);
}

  saveCartToLocalStorage();
  updateTotalAmount();
}

function findCartItem(flavor, size) {
  const cartItems = document.querySelectorAll('.cart-item');
  for (const cartItem of cartItems) {
    const itemFlavor = cartItem.dataset.flavor;
    const itemSize = cartItem.dataset.size;

    if (itemFlavor === flavor && itemSize === size) {
      return cartItem;
    }
  }
  return null;
}

function createCartItem(flavor, size, quantity) {
  const cartItemContainer = document.createElement('div');
  cartItemContainer.className = 'cart-item-container';

  const cartItem = document.createElement('div');
  cartItem.className = 'cart-item';
  cartItem.dataset.itemId = generateItemId();
  cartItem.dataset.flavor = flavor;
  cartItem.dataset.size = size; // Save the size property
  cartItem.quantity = quantity;

  const totalPrice = calculateTotalPrice(flavor, size, quantity);

  const flavorImage = document.createElement('img');
  flavorImage.src = itemDetails[flavor][size].image;
  flavorImage.alt = flavor;
  flavorImage.className = 'cart-item-image';

  const cartItemText = document.createElement('div');
  cartItemText.className = 'cart-item-text';
  cartItemText.innerHTML = `<br>${flavor}<br> ${size}`;

  const priceText = document.createElement('p');
  priceText.className = 'cart-item-price';
  priceText.textContent = `₱${totalPrice.toFixed(2)}`;

  const quantityContainer = document.createElement('div');
  quantityContainer.className = 'quantity-container';
  quantityContainer.style.position = 'relative';

  const minusButton = document.createElement('span');
  minusButton.className = 'quantity-button';
  minusButton.textContent = '-';
  minusButton.style.fontSize = "1vw";
  minusButton.style.border = '.15vw solid #15154E'; // Set border style
  minusButton.style.width = '.8vw'; // Set width
  minusButton.style.position = "absolute";
  minusButton.style.height = '.8vw'; // Set height
  minusButton.style.display = 'flex'; // Make sure it's a flex container
  minusButton.style.justifyContent = 'center'; // Center the text horizontally
  minusButton.style.alignItems = 'center'; // Center the text vertically
  minusButton.style.paddingTop = '.25vw';
  minusButton.style.paddingBottom = '.45vw'
  minusButton.addEventListener('click', function () {
    updateQuantity(cartItem, -1);
  });

  const plusButton = document.createElement('span');
  plusButton.className = 'quantity-button';
  plusButton.textContent = '+';
  plusButton.style.fontSize = "1vw";
  plusButton.style.border = '.15vw solid #15154E';
  plusButton.style.width = '.8vw'; // Set width
  plusButton.style.height = '.8vw'; // Set height
  plusButton.style.display = 'flex'; // Make sure it's a flex container
  plusButton.style.position = "absolute";
  plusButton.style.justifyContent = 'center'; // Center the text horizontally
  plusButton.style.alignItems = 'center'; // Center the text vertically
  plusButton.style.marginLeft = '3vw';
  plusButton.style.marginTop = '.1.8vw';  
  plusButton.style.paddingTop = '.35vw';
  plusButton.style.paddingBottom = '.38vw';
  plusButton.addEventListener('click', function () {
    updateQuantity(cartItem, 1);
  });

  const quantityText = document.createTextNode(`${quantity}`);

  const quantityTextbox = document.createElement('input');
  quantityTextbox.type = 'text';
  quantityTextbox.className = 'quantity-textbox';
  quantityTextbox.value = quantity;

  quantityContainer.appendChild(minusButton);
  quantityContainer.appendChild(quantityTextbox);  // Add the quantity textbox
  quantityContainer.appendChild(plusButton);
  

  const deleteButton = document.createElement('span');
  deleteButton.className = 'delete-button';
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', function () {
    deleteCartItem(cartItem);
  });

  cartItem.appendChild(flavorImage);
  cartItem.appendChild(cartItemText);
  cartItem.appendChild(priceText); // Add the price to cartItem
  cartItem.appendChild(quantityContainer);
  cartItem.appendChild(deleteButton);

  cartItemContainer.appendChild(cartItem);

  return cartItemContainer;
}


function generateItemId() {
  return `cart-item-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function updateQuantity(cartItem, change) {
  const newQuantity = cartItem.quantity + change;

  if (newQuantity <= 0 || isNaN(newQuantity)) {
    deleteCartItem(cartItem);
  } else {
    cartItem.quantity = newQuantity;
    updateCartItem(cartItem);
    updateTotalAmount();
    saveCartToLocalStorage();
  }

  const flavor = cartItem.dataset.flavor;
  const size = cartItem.dataset.size;
  const quantity = cartItem.quantity;

  // Select the quantity container, cart item text, and price text
  const quantityContainer = cartItem.querySelector('.quantity-container');
  const cartItemText = cartItem.querySelector('.cart-item-text');
  const priceText = cartItem.querySelector('.cart-item-price');

  // Update the quantity and price in the cart item text
  cartItemText.innerHTML = `<br>${flavor}<br>${size}<br>`;
  priceText.textContent = `₱${calculateTotalPrice(flavor, size, quantity).toFixed(2)}`;

  // Update the value of the quantity input
  const quantityTextbox = quantityContainer.querySelector('.quantity-textbox');
  console.log(quantityTextbox); // Add this line
  quantityTextbox.value = quantity;
}

function deleteCartItem(cartItem) {
  const cartItemsContainer = document.getElementById('cartItems');
  cartItemsContainer.removeChild(cartItem.parentNode);
  updateTotalAmount();
  saveCartToLocalStorage();
}

//CLERWIN
// Update the saveCartToLocalStorage function to include the total amount
function saveCartToLocalStorage() {
  const cartItems = document.querySelectorAll('.cart-item');
  const cartData = [];
  let totalAmount = 0;

  cartItems.forEach(cartItem => {
    const itemId = cartItem.dataset.itemId;
    const flavor = cartItem.dataset.flavor;
    const size = cartItem.dataset.size;
    const quantity = cartItem.quantity;

    totalAmount += calculateTotalPrice(flavor, size, quantity);

    cartData.push({ itemId, flavor, size, quantity });
  });

  const cartAndTotal = { cartData, totalAmount };
  localStorage.setItem('cart', JSON.stringify(cartAndTotal));
}

function loadCartFromLocalStorage() {
  const cartItemsContainer = document.getElementById('cartItems');
  const cartDataJSON = localStorage.getItem('cart');
  const cartAndTotal = JSON.parse(cartDataJSON) || { cartData: [], totalAmount: 0 };

  cartItemsContainer.innerHTML = '';

  // Create a function to handle item loading and return a Promise
  function loadItem(item) {
    return new Promise(resolve => {
      const { itemId, flavor, size, quantity } = item;
      const cartItem = createCartItem(flavor, size, quantity);

      const img = cartItem.querySelector('.cart-item-image');

      // Use the onload event to resolve the Promise
      img.onload = () => resolve();

      // Trigger the onload event in case the image is already cached
      if (img.complete) {
        img.onload();
      }

      cartItem.dataset.itemId = itemId;
      cartItemsContainer.appendChild(cartItem);
      updateCartItem(cartItem);
    });
  }

  // Create an array of Promises for each item
  const itemPromises = cartAndTotal.cartData.map(loadItem);

  // Wait for all Promises to resolve before updating total amount and saving to local storage
  Promise.all(itemPromises).then(() => {
    updateTotalAmount(cartAndTotal.totalAmount);
    saveCartToLocalStorage();
  });
}


function updateCartItem(cartItem) {
  const flavor = cartItem.dataset.flavor;
  const size = cartItem.dataset.size;
  const quantity = cartItem.quantity;
  const totalPrice = calculateTotalPrice(flavor, size, quantity);

  const cartItemText = cartItem.querySelector('.cart-item-text');
  cartItemText.innerHTML = `<br>${flavor}<br>${size}<br>`;
}

function updateTotalAmount() {
  const cartItems = document.querySelectorAll('.cart-item');
  let totalAmount = 0;

  cartItems.forEach(cartItem => {
    const flavor = cartItem.dataset.flavor;
    const size = cartItem.dataset.size;
    const quantity = cartItem.quantity;

    totalAmount += calculateTotalPrice(flavor, size, quantity);
  });

  console.log("Total amount calculated:", totalAmount);
  document.getElementById('yourTotalAmountElement').textContent = ` ₱ ${totalAmount.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', function () {
  loadCartFromLocalStorage();
  updateTotalAmount();
});


for (let i = 1; i <= 45; i++) {
  const flavorContainer = document.querySelector(`.new-flavor-container${i}`);
  flavorContainer.addEventListener('click', function (event) {
    console.log('Container clicked:', i);
    if (event.target.tagName === 'BUTTON') {
      console.log('Button clicked:', event.target.textContent);
      const flavor = flavorContainer.querySelector('.txtformat').textContent;
      const size = event.target.dataset.size;
      addToCart(flavor, size);
      updateTotalAmount();
    }
  });
}


const checkoutButton = document.getElementById('checkoutButton');
checkoutButton.addEventListener('click', function () {
  alert('Checkout button clicked! Implement your checkout logic.');
});


