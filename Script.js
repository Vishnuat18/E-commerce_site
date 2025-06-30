const products = [
  { id: 1, name: "Blue Denim shirt", price: 25.00 * 20.24, category: "Clothing", image: "imgs/Bluedenimshirt.jpg", description: "Breathable cotton shirt for everyday wear." },
  { id: 2, name: "sports Jersey ", price: 45.00 * 20.24, category: "Clothing", image:"imgs/Sportsjersey.jpg", description: "Stylish denim jacket for a rugged look." },
  { id: 3, name: "yellow polo t-shirt", price: 35.00 * 20.24, category: "Clothing", image: "imgs/Yellow.jpg", description: "Light and flowy dress for summer outings." },
  { id: 4, name: "Brown Joodie", price: 30.00 * 20.24, category: "Clothing", image: "imgs/Brown.jpg", description: "Cozy hoodie for casual comfort." },
  { id: 5, name: "Grey denim Jacket", price: 60.00 * 20.24, category: "Clothing", image: "imgs/Grey.jpg", description: "Sharp blazer for professional lookup." },
  { id: 6, name: "Brown loafers", price: 40.00 * 20.24, category: "Shoes", image: "imgs/Brownloafers.jpg", description: "Versatile sneakers for all occasions." },
  { id: 7, name: "Black leather boots", price: 50.00 * 20.24, category: "Shoes", image: "imgs/Blackboots.jpg", description: "Elegant loafers for formal wear." },
  { id: 8, name: "Hiking shoes", price: 55.00 * 20.24, category: "Shoes", image: "imgs/Hiking.jpg", description: "Lightweight shoes for running and sports." },
  { id: 9, name: "Running shoes", price: 65.00 * 20.24, category: "Shoes", image: "imgs/Runningshoes.jpg", description: "Trendy boots for cooler days." },
  { id: 10, name: "Classic sneakers", price: 30.00 * 20.24, category: "Shoes", image: "imgs/Sneakers.jpg", description: "Easy-to-wear slip-ons for casual vibes." },
  { id: 11, name: "Black leather Wallet", price: 20.00 * 20.24, category: "Accessories", image: "imgs/Wallet.jpg", description: "Sleek wallet for everyday essentials." },
  { id: 12, name: " Black Sunglasses", price: 15.00 * 20.24, category: "Accessories", image: "imgs/Sunglass.jpg", description: "Classic sunglasses for a bold look." },
  { id: 13, name: "Casual cap", price: 18.00 * 20.24, category: "Accessories", image: "imgs/XCap.jpg", description: "Soft cap protect heat and style." },
  { id: 14, name: "Classic Watch", price: 35.00 * 20.24, category: "Accessories", image: "imgs/Watch.jpg", description: "Stylish watch for daily use." },
  { id: 15, name: "Brown leather Belt", price: 12.00 * 20.24, category: "Accessories", image: "imgs/Belt.jpg", description: "Leathered belt for a unique touch." }
];

// DOM elements
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");

// Load products based on filter and category
function loadProducts(filter = "", category = "All") {
  const bestSeller = document.querySelector(".best-seller");
  bestSeller.innerHTML = "";

  const filteredProducts = products.filter(product =>
    (category === "All" || product.category === category) &&
    product.name.toLowerCase().includes(filter.toLowerCase())
  );

  filteredProducts.forEach(product => {
    const symbolStyles = [
      { color: "#ff3c78", fontSize: "1.2rem" },
      { color: "#000", fontSize: "1.1rem" },
      { color: "#aaa", fontSize: "1rem" }
    ];
    const style = symbolStyles[product.id % 3];
    const symbol = `<span class="product-symbol" style="color: ${style.color}; font-size: ${style.fontSize};">🆂</span>`;

    bestSeller.innerHTML += `
      <div class="best-p1" data-id="${product.id}">
        <img src="${product.image}" alt="${product.name}">
        <div class="best-p1-txt">
          <div class="name-of-p"><p>${product.name}</p></div>
          <div class="price">₹${product.price.toFixed(2)} ${symbol}</div>
          <div class="add-cart"><button>Add to Cart</button></div>
        </div>
      </div>
    `;
  });

  if (filteredProducts.length === 0) {
    bestSeller.innerHTML = "<p>No products found.</p>";
  }
}

// Event listeners for search and filter
searchInput.addEventListener("input", () => {
  loadProducts(searchInput.value, categorySelect.value);
});

categorySelect.addEventListener("change", () => {
  loadProducts(searchInput.value, categorySelect.value);
});

// Initial load
loadProducts();
