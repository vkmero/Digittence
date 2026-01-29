const BASE_URL = "http://localhost:5000/api"; 
// later change to deployed backend URL

async function login(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const msg = document.getElementById("login-msg");

    try {
        const res = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem("token", data.token);
            window.location.href = "dashboard.html";
        } else {
            msg.textContent = data.message;
            msg.className = "msg error";
        }
    } catch {
        msg.textContent = "Server error";
        msg.className = "msg error";
    }
}

async function register(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const msg = document.getElementById("register-msg");

    const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    msg.textContent = data.message;
    msg.className = res.ok ? "msg success" : "msg error";
}

async function forgotPassword(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const msg = document.getElementById("forgot-msg");

    const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
    });

    const data = await res.json();
    msg.textContent = data.message;
    msg.className = res.ok ? "msg success" : "msg error";
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}
