const products = [
{ id: 1, name: "Classic T-Shirt", price: 19.99, category: "Clothes", emoji: "n" },
{ id: 2, name: "Laptop Bag", price: 45.00, category: "Electronics", emoji: "n" },
{ id: 3, name: "JavaScript Book", price: 29.99, category: "Books", emoji: "n" },
{ id: 4, name: "Sneakers", price: 89.99, category: "Shoes", emoji: "n" },
{ id: 5, name: "Wireless Earbuds", price: 34.99, category: "Electronics", emoji: "n" },
{ id: 6, name: "Sunglasses", price: 24.99, category: "Clothes", emoji: "n" },
{ id: 7, name: "Phone Case", price: 12.99, category: "Electronics", emoji: "n" },
{ id: 8, name: "Backpack", price: 55.00, category: "Clothes", emoji: "n" },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

