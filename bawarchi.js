// Get modal elements
const loginModal = document.getElementById("loginModal");
const loginBtn = document.getElementById("loginBtn");
const loginCloseBtn = document.querySelector(".close"); // Renamed this to loginCloseBtn

// Toggle between login and register forms
const showLoginBtn = document.getElementById("showLogin");
const showRegisterBtn = document.getElementById("showRegister");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

// Show the login modal when the login button is clicked
loginBtn.addEventListener("click", () => {
    loginModal.style.display = "block";
});

// Close the modal when the close button is clicked
loginCloseBtn.addEventListener("click", () => {
    loginModal.style.display = "none";
});

// Close the modal when clicking outside the modal content
window.onclick = function(event) {
    if (event.target === loginModal) {
        loginModal.style.display = "none";
    }
};

// Show login form and hide register form
showLoginBtn.addEventListener("click", () => {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    showLoginBtn.classList.add("active-toggle");
    showRegisterBtn.classList.remove("active-toggle");
});

// Show register form and hide login form
showRegisterBtn.addEventListener("click", () => {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    showRegisterBtn.classList.add("active-toggle");
    showLoginBtn.classList.remove("active-toggle");
})

// Function to handle scrolling the menu
function scrollMenu(direction) {
    const menu = document.getElementById('menu');
    menu.scrollBy({ left: direction, behavior: 'smooth' });
}

// Function to filter the menu by category
function filterMenu(category) {
    const menuItems = document.querySelectorAll('.menu-item');
    const products = document.querySelectorAll('.product-card');

    menuItems.forEach(item => item.classList.remove('active'));
    document.querySelector(`.menu-item[onclick="filterMenu('${category}')"]`).classList.add('active');

    products.forEach(product => {
        if (product.dataset.category === category || category === 'All') {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}
// Add your selectCity function here
function selectCity(city) {
    // Update the dropdown button text with the selected city
    document.getElementById('selectedCity').innerHTML = city + ' <i class="arrow-down">&#9660;</i>';
}
 // Global Product List for Cart
let productsInCart = [];

// Get the checkout form, buttons, and product summary elements
const checkoutForm = document.getElementById('checkoutForm');
const closeBtn = document.querySelector('.close-btn');
const productSummary = document.getElementById('added-products');
const addMoreBtn = document.getElementById('add-more-btn');

// Function to add a product to the cart
function addToCart(button) {
    // Get the product details from data attributes with fallback values
    const product = button.getAttribute('data-product') || 'Unknown Product';
    const price = button.getAttribute('data-price') || '0';

    // Check if the product is already in the cart
    const existingProductIndex = productsInCart.findIndex(item => item.product === product);

    if (existingProductIndex !== -1) {
        // If the product exists, increase the quantity
        productsInCart[existingProductIndex].quantity += 1;
    } else {
        // Add the product with an initial quantity of 1
        productsInCart.push({ product, price, quantity: 1 });
    }

    // Update the product summary in the checkout form
    updateProductSummary();

    // Display the checkout form
    checkoutForm.style.display = 'block';
}

// Attach event listener to all "Add Now" buttons
const addNowBtns = document.querySelectorAll('.add-now-btn');
addNowBtns.forEach(btn => {
    btn.addEventListener('click', () => addToCart(btn));
});

// Function to close the checkout form
closeBtn.addEventListener('click', () => {
    checkoutForm.style.display = 'none';
});

// Close the checkout form if the user clicks outside of it
window.onclick = function(event) {
    if (event.target === checkoutForm) {
        checkoutForm.style.display = 'none';
    }
};

// Function to update the product summary with quantity controls
function updateProductSummary() {
    // Clear the current product summary
    productSummary.innerHTML = '';

    // Loop through products in the cart and create product display
    productsInCart.forEach((item, index) => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <span>${item.product} - NPR ${item.price} x ${item.quantity}</span>
            <div class="quantity-controls">
                <button class="decrease-btn" data-index="${index}">-</button>
                <span>${item.quantity}</span>
                <button class="increase-btn" data-index="${index}">+</button>
                <button class="remove-btn" data-index="${index}">Remove</button>
            </div>
        `;
        productSummary.appendChild(productItem);
    });

    // Add event listeners to all quantity control buttons
    attachQuantityControlEvents();
}

// Function to attach quantity control events
function attachQuantityControlEvents() {
    // Decrease quantity
    document.querySelectorAll('.decrease-btn').forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            if (productsInCart[index].quantity > 1) {
                productsInCart[index].quantity -= 1;
            } else {
                productsInCart.splice(index, 1); // Remove product if quantity is 1
            }
            updateProductSummary();
        });
    });

    // Increase quantity
    document.querySelectorAll('.increase-btn').forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            productsInCart[index].quantity += 1;
            updateProductSummary();
        });
    });

    // Remove product
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            productsInCart.splice(index, 1);
            updateProductSummary();
        });
    });
}

// Add more products by closing the checkout form
addMoreBtn.addEventListener('click', () => {
    checkoutForm.style.display = 'none'; // Close the checkout form to add more products
});

// Search Bar Functionality to Filter Menu Items
document.addEventListener('DOMContentLoaded', function() {
    const searchBar = document.getElementById('searchBar');  
    const products = document.querySelectorAll('.product-card');

    searchBar.addEventListener('input', function() {
        const searchQuery = searchBar.value.toLowerCase();

        products.forEach(function(product) {
            const productName = product.querySelector('.product-name').textContent.toLowerCase();  // Ensure .product-name class exists

            if (productName.includes(searchQuery)) {
                product.style.display = 'block';  // Show product if it matches search query
            } else {
                product.style.display = 'none';   // Hide product if it doesn't match
            }
        });
    });
});



