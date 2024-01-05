// Array to store product data
const products = [
    {
        id: 1,
        name: "RV Times Mug",
        image: "mug.jpg",
        price: 15.99,
    },
    {
        id: 2,
        name: "RV Times T-Shirt",
        image: "tshirt.jpg",
        price: 22.99,
        sizes: ["S", "M", "L", "XL"],
    },
    {
        id: 3,
        name: "RV Times Magazine (Latest Issue)",
        image: "magazine.jpg",
        price: 9.99,
    },
    {
        id: 4,
        name: "RV Times Newspaper (Monthly Subscription)",
        image: "newspaper.jpg",
        price: 4.99,
    },
];

// Empty cart array
let cart = [];

// DOM elements
const productGrid = document.querySelector(".product-grid");
const cartItemsList = document.querySelector(".cart-items");
const cartTotalEl = document.querySelector(".cart-total");
const checkoutButton = document.querySelector(".checkout-button");

// Build product cards dynamically
function renderProducts() {
    productGrid.innerHTML = "";
    for (const product of products) {
        const card = document.createElement("div");
        card.classList.add("product-card");

        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;
        card.appendChild(image);

        const title = document.createElement("h3");
        title.textContent = product.name;
        card.appendChild(title);

        const price = document.createElement("p");
        price.textContent = `Price: $${product.price}`;
        card.appendChild(price);

        const button = document.createElement("button");
        button.textContent = "Add to Cart";
        button.addEventListener("click", () => addToCart(product));
        card.appendChild(button);

        productGrid.appendChild(card);
    }
}

// Add product to cart
function addToCart(product) {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    updateCartUI();
}

// Update cart UI
function updateCartUI() {
    cartItemsList.innerHTML = "";
    let total = 0;
    for (const item of cart) {
        const cartItem = document.createElement("li");
        cartItem.classList.add("cart-item");

        const itemImage = document.createElement("img");
        itemImage.src = item.image;
        itemImage.alt = item.name;
        cartItem.appendChild(itemImage);

        const itemDetails = document.createElement("div");
        itemDetails.classList.add("item-details");

        const itemName = document.createElement("h4");
        itemName.textContent = item.name;
        itemDetails.appendChild(itemName);

        const itemPrice = document.createElement("p");
        itemPrice.textContent = `Price: $${item.price}`;
        itemDetails.appendChild(itemPrice);

        const itemQuantity = document.createElement("p");
        itemQuantity.textContent = `Quantity: ${item.quantity}`;
        itemDetails.appendChild(itemQuantity);

        cartItem.appendChild(itemDetails);

        // Add button to remove item from cart
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => removeFromCart(item.id));
        cartItem.appendChild(removeButton);

        cartItemsList.appendChild(cartItem);

        total += item.price * item.quantity;
    }

    cartTotalEl.textContent = `Total: $${total.toFixed(2)}`;
    checkoutButton.disabled = cart.length === 0;
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    updateCartUI();
}

// Render products on page load
renderProducts();
