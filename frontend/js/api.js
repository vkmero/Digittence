const API = "http://localhost:5000/api";
const token = localStorage.getItem("token");

async function loadDashboard() {
    const res = await fetch(`${API}/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();
    document.getElementById("students").innerText = data.students;
    document.getElementById("classes").innerText = data.classes;
}

async function startAttendance() {
    const subject = document.getElementById("subject").value;
    const date = document.getElementById("date").value;
    const classes = document.getElementById("classes").value;

    localStorage.setItem("attendance", JSON.stringify({ subject, date, classes }));
    window.location.href = "attendance.html";
}

async function confirmAttendance() {
    await fetch(`${API}/attendance/mark`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    });

    alert("Attendance saved");
}

async function getAnalysis() {
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const subject = document.getElementById("subject").value;

    const res = await fetch(`${API}/attendance/analysis`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ from, to, subject })
    });

    const data = await res.json();
    document.getElementById("topper").innerText = "Topper: " + data.topper;
}
