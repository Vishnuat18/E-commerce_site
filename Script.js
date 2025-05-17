
const products = [
    // Clothing
    { id: 1, name: "Blue Denim shirt", price: 25.00 * 20.24, category: "Clothing", image: "imgs/Bluedenimshirt.jpg", description: "Breathable cotton shirt for everyday wear." },
    { id: 2, name: "sports Jersey ", price: 45.00 * 20.24, category: "Clothing", image:"imgs/Sportsjersey.jpg", description: "Stylish denim jacket for a rugged look." },
    { id: 3, name: "yellow polo t-shirt", price: 35.00 * 20.24, category: "Clothing", image: "imgs/Yellow.jpg", description: "Light and flowy dress for summer outings." },
    { id: 4, name: "Brown Joodie", price: 30.00 * 20.24, category: "Clothing", image: "imgs/Brown.jpg", description: "Cozy hoodie for casual comfort." },
    { id: 5, name: "Grey denim Jacket", price: 60.00 * 20.24, category: "Clothing", image: "imgs/Grey.jpg", description: "Sharp blazer for professional lookup." },
    // Shoes
    { id: 6, name: "Brown loafers", price: 40.00 * 20.24, category: "Shoes", image: "imgs/Brownloafers.jpg", description: "Versatile sneakers for all occasions." },
    { id: 7, name: "Black leather boots", price: 50.00 * 20.24, category: "Shoes", image: "imgs/Blackboots.jpg", description: "Elegant loafers for formal wear." },
    { id: 8, name: "Hiking shoes", price: 55.00 * 20.24, category: "Shoes", image: "imgs/Hiking.jpg", description: "Lightweight shoes for running and sports." },
    { id: 9, name: "Running shoes", price: 65.00 * 20.24, category: "Shoes", image: "imgs/Runningshoes.jpg", description: "Trendy boots for cooler days." },
    { id: 10, name: "Classic sneakers", price: 30.00 * 20.24, category: "Shoes", image: "imgs/Sneakers.jpg", description: "Easy-to-wear slip-ons for casual vibes." },
    // Accessories
    { id: 11, name: "Black leather Wallet", price: 20.00 * 20.24, category: "Accessories", image: "imgs/Wallet.jpg", description: "Sleek wallet for everyday essentials." },
    { id: 12, name: " Black Sunglasses", price: 15.00 * 20.24, category: "Accessories", image: "imgs/Sunglass.jpg", description: "Classic sunglasses for a bold look." },
    { id: 13, name: "Casual cap", price: 18.00 * 20.24, category: "Accessories", image: "imgs/XCap.jpg", description: "Soft cap protect heat and style." },
    { id: 14, name: "Classic Watch", price: 35.00 * 20.24, category: "Accessories", image: "imgs/Watch.jpg" },
    { id: 15, name: "Brown leather Belt", price: 12.00 * 20.24, category: "Accessories", image: "imgs/Belt.jpg", description: "Leathered belt for a unique touch." }
];

// Cart and user data in localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let user = JSON.parse(localStorage.getItem("user")) || null;

// DOM elements
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const bestSellers = document.querySelectorAll(".best-seller");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const checkoutForm = document.querySelector("#checkout-form");
const loginForm = document.querySelector("#login-form");
const signupForm = document.querySelector("#signup-form");
const contactForm = document.querySelector("#contact-form");
const modal = document.querySelector("#modal");
const modalContent = document.querySelector("#modal-content");
const notification = document.querySelector("#notification");
const signInUp = document.querySelector(".sing_in_up");
const authForms = document.querySelector("#auth-forms");
const profile = document.querySelector("#profile");
const checkbox = document.querySelector("#checkbox");
const menuLinks = document.querySelectorAll(".menu-items a");

// Smooth scrolling
document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", e => {
        if (link.hash && !link.classList.contains("no-scroll")) {
            e.preventDefault();
            document.querySelector(link.hash).scrollIntoView({ behavior: "smooth" });
            window.history.pushState(null, null, link.hash);
        }
    });
});

// Close mobile menu on link click
menuLinks.forEach(link => {
    link.addEventListener("click", () => {
        checkbox.checked = false;
    });
});

// Load products
function loadProducts(filter = "", category = "All") {
    bestSellers.forEach(bestSeller => {
        bestSeller.innerHTML = "";
        const filteredProducts = products.filter(product =>
            (category === "All" || product.category === category) &&
            product.name.toLowerCase().includes(filter.toLowerCase())
        );
        filteredProducts.forEach(product => {
            // Define symbol style variations based on product ID
            const symbolStyles = [
                { color: "#ff3c78", fontSize: "1.2rem" }, // Primary color
                { color: "#000", fontSize: "1.1rem" },    // Black
                { color: "#aaa", fontSize: "1rem" }       // Grey
            ];
            const style = symbolStyles[product.id % 3]; // Cycle through 3 styles
            const symbol = `<span class="product-symbol" style="color: ${style.color}; font-size: ${style.fontSize};">🆂</span>`;
            
            bestSeller.innerHTML += `
                <div class="best-p1" data-id="${product.id}">
                    <img src="${product.image}" alt="${product.name}" role="button" aria-label="View ${product.name} details">
                    <div class="best-p1-txt">
                        <div class="name-of-p"><p>${product.name}</p></div>
                        <div class="price">₹${product.price.toFixed(2)}${symbol}</div>
                        <div class="add-cart"><button aria-label="Add ${product.name} to cart">Add to Cart</button></div>
                    </div>
                </div>
            `;
        });
    });
}

// Update cart
function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        total += product.price * item.quantity;
        cartItems.innerHTML += `
            <div class="cart-item" data-id="${item.id}">
                <img src="${product.image}" alt="${product.name}">
                <div class="cart-item-details">
                    <p>${product.name}</p>
                    <p>₹${product.price.toFixed(2)}</p>
                    <input type="number" value="${item.quantity}" min="1" aria-label="Quantity for ${product.name}">
                    <button aria-label="Remove ${product.name} from cart">Remove</button>
                </div>
            </div>
        `;
    });
    cartTotal.innerHTML = `Total: ₹${total.toFixed(2)}<br><button ${cart.length === 0 ? "disabled" : ""}>Proceed to Checkout</button>`;
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Show notification
function showNotification(message) {
    notification.textContent = message;
    notification.classList.add("show");
    setTimeout(() => {
        notification.classList.remove("show");
    }, 2000);
}

// Update authentication UI
function updateAuthUI() {
    if (user) {
        signInUp.innerHTML = `<span>Welcome, ${user.username}</span> <a href="#account" class="no-scroll">Profile</a> <a href="#" id="logout" class="no-scroll">Logout</a>`;
        authForms.style.display = "none";
        profile.style.display = "block";
        profile.innerHTML = `
            <h2>User Profile</h2>
            <p>Username: ${user.username}</p>
            <p>Email: ${user.email}</p>
            <button id="logout-profile">Logout</button>
        `;
    } else {
        signInUp.innerHTML = `<a href="#account" class="no-scroll">SIGN IN</a> <a href="#account" class="no-scroll">SIGN UP</a>`;
        authForms.style.display = "block";
        profile.style.display = "none";
    }
}

// Event listeners
searchInput.addEventListener("input", () => {
    loadProducts(searchInput.value, categorySelect.value);
});

categorySelect.addEventListener("change", () => {
    loadProducts(searchInput.value, categorySelect.value);
});

document.addEventListener("click", e => {
    if (e.target.matches(".add-cart button")) {
        const id = parseInt(e.target.closest(".best-p1").dataset.id);
        const item = cart.find(i => i.id === id);
        if (item) {
            item.quantity++;
        } else {
            cart.push({ id, quantity: 1 });
        }
        updateCart();
        showNotification("Item added to cart!");
    }
    if (e.target.matches(".modal .add-cart")) {
        const id = parseInt(e.target.dataset.id);
        const item = cart.find(i => i.id === id);
        if (item) {
            item.quantity++;
        } else {
            cart.push({ id, quantity: 1 });
        }
        updateCart();
        modal.style.display = "none";
        showNotification("Item added to cart!");
    }
    if (e.target.matches(".cart-item button")) {
        const id = parseInt(e.target.closest(".cart-item").dataset.id);
        cart = cart.filter(i => i.id !== id);
        updateCart();
        showNotification("Item removed from cart!");
    }
    if (e.target.matches(".cart-total button")) {
        if (cart.length > 0) {
            document.querySelector("#cart").style.display = "none";
            document.querySelector("#checkout").style.display = "block";
        }
    }
    if (e.target.matches(".best-p1 img")) {
        const id = parseInt(e.target.closest(".best-p1").dataset.id);
        const product = products.find(p => p.id === id);
        modalContent.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>₹${product.price.toFixed(2)}</p>
            <p>${product.description}</p>
            <button class="add-cart" data-id="${product.id}" aria-label="Add ${product.name} to cart">Add to Cart</button>
            <button class="close-modal" aria-label="Close product details">Close</button>
        `;
        modal.style.display = "block";
    }
    if (e.target.matches(".close-modal")) {
        modal.style.display = "none";
    }
    if (e.target.matches("#logout, #logout-profile")) {
        user = null;
        localStorage.removeItem("user");
        updateAuthUI();
        showNotification("Logged out successfully!");
    }
});

document.addEventListener("change", e => {
    if (e.target.matches(".cart-item input")) {
        const id = parseInt(e.target.closest(".cart-item").dataset.id);
        const quantity = parseInt(e.target.value);
        const item = cart.find(i => i.id === id);
        if (quantity > 0) {
            item.quantity = quantity;
        } else {
            cart = cart.filter(i => i.id !== id);
        }
        updateCart();
    }
});

loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const username = document.querySelector("#login-username").value;
    const password = document.querySelector("#login-password").value;
    if (username && password) {
        user = { username, email: "user@example.com" };
        localStorage.setItem("user", JSON.stringify(user));
        updateAuthUI();
        showNotification("Logged in successfully!");
    } else {
        showNotification("Please fill in all fields");
    }
});

signupForm.addEventListener("submit", e => {
    e.preventDefault();
    const username = document.querySelector("#signup-username").value;
    const email = document.querySelector("#signup-email").value;
    const password = document.querySelector("#signup-password").value;
    if (username && email && password) {
        user = { username, email };
        localStorage.setItem("user", JSON.stringify(user));
        updateAuthUI();
        showNotification("Signed up successfully!");
    } else {
        showNotification("Please fill in all fields");
    }
});

checkoutForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.querySelector("#checkout-name").value;
    const address = document.querySelector("#checkout-address").value;
    const payment = document.querySelector("#checkout-payment").value;
    if (name && address && payment) {
        cart = [];
        updateCart();
        document.querySelector("#checkout").style.display = "none";
        showNotification("Order placed successfully!");
    } else {
        showNotification("Please fill in all fields");
    }
});

contactForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.querySelector("#contact-name").value;
    const email = document.querySelector("#contact-email").value;
    const message = document.querySelector("#contact-message").value;
    if (name && email && message) {
        showNotification("Message sent successfully!");
        contactForm.reset();
    } else {
        showNotification("Please fill in all fields");
    }
});

// Initialize
loadProducts();
updateCart();
updateAuthUI();
