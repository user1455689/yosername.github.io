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
// Global Product List for Cart
let productsInCart = [];

// Open and close the checkout form popup
const checkoutForm = document.getElementById('checkoutForm');
const closeBtn = document.querySelector('.close-btn');
const productSummary = document.getElementById('added-products');
const addMoreBtn = document.getElementById('add-more-btn');

// Function to add a product to the cart
function addToCart(button) {
    // Get the product details from data attributes
    const product = button.getAttribute('data-product');
    const price = button.getAttribute('data-price');

    // Add the product to the cart
    productsInCart.push({ product, price });
    updateProductSummary();

    // Display the checkout form
    checkoutForm.style.display = 'block';
}

// Add event listener to all "Add Now" buttons
const addNowBtns = document.querySelectorAll('.add-now-btn');
addNowBtns.forEach(btn => {
    btn.addEventListener('click', () => addToCart(btn));
});

// Close the checkout form
closeBtn.addEventListener('click', () => {
    checkoutForm.style.display = 'none';
});

// Close the checkout form if the user clicks outside of it
window.onclick = function(event) {
    if (event.target === checkoutForm) {
        checkoutForm.style.display = 'none';
    }
};

// Update the product summary in the checkout form
function updateProductSummary() {
    // Clear the current summary
    productSummary.innerHTML = '';

    // Loop through products in the cart and display each
    productsInCart.forEach((item, index) => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <span>${item.product} - NPR ${item.price}</span>
            <button class="remove-btn" data-index="${index}">Remove</button>
        `;

        productSummary.appendChild(productItem);
    });

    // Add event listeners to all remove buttons
    const removeBtns = document.querySelectorAll('.remove-btn');
    removeBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            productsInCart.splice(index, 1);  // Remove the product from the cart
            updateProductSummary();  // Update the summary
        });
    });
}

// Add more products by clicking the "Add More Products" button
addMoreBtn.addEventListener('click', () => {
    checkoutForm.style.display = 'none';  // Close the checkout form to add more products
});
