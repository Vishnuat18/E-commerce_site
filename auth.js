// Sign Up
if (document.querySelector("#signup-form")) {
    document.querySelector("#signup-form").addEventListener("submit", e => {
        e.preventDefault();
        const username = document.querySelector("#signup-username").value.trim();
        const email = document.querySelector("#signup-email").value.trim();
        const password = document.querySelector("#signup-password").value.trim();

        if (username && email && password) {
            const userData = { username, email, password };
            localStorage.setItem("user", JSON.stringify(userData));
            window.location.href = "login.html";
        } else {
            document.querySelector("#signup-error").textContent = "All fields are required.";
        }
    });
}

// Login
if (document.querySelector("#login-form")) {
    document.querySelector("#login-form").addEventListener("submit", e => {
        e.preventDefault();
        const username = document.querySelector("#login-username").value.trim();
        const password = document.querySelector("#login-password").value.trim();
        const savedUser = JSON.parse(localStorage.getItem("user"));

        if (savedUser && username === savedUser.username && password === savedUser.password) {
            localStorage.setItem("isLoggedIn", "true");
            window.location.href = "index.html";
        } else {
            document.querySelector("#login-error").textContent = "Invalid credentials or user not found.";
            setTimeout(() => window.location.href = "signup.html", 2000);
        }
    });
}
