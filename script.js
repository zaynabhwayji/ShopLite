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

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const searchInput = document.getElementById("searchInput");
const productGrid = document.getElementById("productGrid");
const filterButtons = document.querySelectorAll(".filter-btn");
const cartBtn = document.getElementById("cartBtn");

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
