const products = [
    { id: 1, name: "Classic T-Shirt", price: 19.99, category: "Clothes", emoji: "■" },
    { id: 2, name: "Laptop Bag", price: 45.00, category: "Electronics", emoji: "■" },
    { id: 3, name: "JavaScript Book", price: 29.99, category: "Books", emoji: "■" },
    { id: 4, name: "Sneakers", price: 89.99, category: "Shoes", emoji: "■" },
    { id: 5, name: "Wireless Earbuds", price: 34.99, category: "Electronics", emoji: "■" },
    { id: 6, name: "Sunglasses", price: 24.99, category: "Clothes", emoji: "■" },
    { id: 7, name: "Phone Case", price: 12.99, category: "Electronics", emoji: "■" },
    { id: 8, name: "Backpack", price: 55.00, category: "Clothes", emoji: "■" },
];


const searchInput = document.getElementById("searchInput");
const productGrid = document.getElementById("productGrid");
const filterButtons = document.querySelectorAll(".filter-btn");
const cartBtn = document.getElementById("cartBtn");
const cartItems = document.querySelector("#cartItems");
const cartPanel = document.getElementById("cartPanel");

let cart = JSON.parse(localStorage.getItem("items")) || [];

let cartCount = 0;

cart.forEach(item => {
    cartCount += item.quantity;
});

cartBtn.textContent = `Cart (${cartCount})`;


let activeCategory = "all";

function displayProducts(products) {
    productGrid.innerHTML = "";

    products.forEach(product => {

        productGrid.innerHTML += `
            <div class="product-card" data-id="${product.id}">
            <div class="emoji">${product.emoji}</div>
            <h3>${product.name}</h3>
            <div class="price"><h3>$ ${product.price}</h3><button class="add-btn" onclick="addToCart(${product.id})" data-id="${product.id}"> +Cart </button></div>
            </div>
        `;
        
    });
}

displayProducts(products);

function applyFilters() {

    const searchValue = searchInput.value.toLowerCase();

    const result = products.filter(product => {

        let sameCategory = false;
        let sameName = false;

        if ( activeCategory === "all" || product.category === activeCategory ) {
            
            sameCategory = true;
        }


        if ( product.name.toLowerCase().includes(searchValue) ) {

            sameName = true;
        }

        return sameCategory && sameName;

    });

    displayProducts(result);
}

searchInput.addEventListener("input", () => {
    applyFilters();
});

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        activeCategory = button.dataset.cat;

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        applyFilters();
    });

});

cartBtn.addEventListener("click", () => {
    cartPanel.classList.toggle("active");
});

renderCart();



function addToCart(productId) {
    const cartItem = {
    id: Date.now(),
    pId: productId,
    quantity: 1,
    }
    const existingItem = cart.find(item => item.pId === productId);
    if (existingItem) {
    existingItem.quantity += 1;
    } else {
    cart.push(cartItem);
    }
    cartCount += 1;
    cartBtn.textContent = `Cart (${cartCount})`;
    addToLocalStorage(cart);
    renderCart();
}

function RemoveFromCart(productId) {
    const existingItem = cart.find(item => item.pId === productId);

    if (existingItem) {

        if (existingItem.quantity == 1) {
            cart = cart.filter(item => item.pId !== productId);
        } else {
            existingItem.quantity -= 1;
    }

    cartCount -= 1;
    cartBtn.textContent = `Cart (${cartCount})`;

    addToLocalStorage(cart);
    renderCart();
}
}

function addToLocalStorage(cart) {
    window.localStorage.setItem("items", JSON.stringify(cart));
}

function renderCart() {

    if (cart.length === 0) {
    cartItems.innerHTML = `<p class="empty-cart">🛒 Your cart is empty</p>`;
    document.querySelector("#cartTotal").textContent = "0.00";
    return;
}

let total = 0;
cartItems.innerHTML = "";

cart.forEach(cartItem => {
    const item = products.find(item => item.id === cartItem.pId);
    total += item.price * cartItem.quantity;
    cartItems.innerHTML += `
        <div class="product-card" data-id="${cartItem.id}">
            <h3>${item.name}</h3>
            <div class="price">
            <h3>$ ${item.price}</h3>
            <button class="add-btn" data-id="${item.id}" onclick="addToCart(${item.id})"> + </button>
            <button class="add-btn" data-id="${item.id}" onclick="RemoveFromCart(${item.id})"> - </button>
            <span>${cartItem.quantity}</span>
            </div>
        </div> 
    `;
});
document.querySelector("#cartTotal").textContent = total.toFixed(2);
}

function ClearCart() {
    cart = [];
    cartCount = 0;
    cartBtn.textContent = `Cart (0)`;
    addToLocalStorage(cart);
    renderCart();
}

function CheckOut() {

    const total = document.querySelector("#cartTotal").textContent;

    alert("Your total is $" + total);

    ClearCart();

    cartCount = 0;

    cartBtn.textContent = `Cart (${cartCount})`;

}
