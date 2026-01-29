let startX = 0;
let rollList = [];
let index = 0;
let attendance = {};   // rollNo : PRESENT / ABSENT
let token = localStorage.getItem("token");

// ================================
// FETCH ROLL NUMBERS
// ================================
async function loadRollNos() {
    try {
        const res = await fetch("http://localhost:5000/api/students/rollnos", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await res.json();
        rollList = data.rollNos;

        if (!rollList.length) {
            alert("No students found");
            return;
        }

        showRoll();
    } catch {
        alert("Failed to load roll numbers");
    }
}

function showRoll() {
    document.getElementById("roll").innerText =
        `Roll No: ${rollList[index]}`;
}

// ================================
// MOBILE SWIPE
// ================================
document.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
});

document.addEventListener("touchend", e => {
    const diff = e.changedTouches[0].clientX - startX;
    if (diff > 50) mark("PRESENT");
    else if (diff < -50) mark("ABSENT");
});

// ================================
// PC KEYBOARD
// ================================
document.addEventListener("keydown", e => {
    const key = e.key.toLowerCase();
    if (key === "p") mark("PRESENT");
    if (key === "a") mark("ABSENT");
});

// ================================
// MARK & MOVE NEXT
// ================================
function mark(status) {
    const rollNo = rollList[index];
    attendance[rollNo] = status;
    index++;

    if (index >= rollList.length) {
        showSummary();
        return;
    }

    showRoll();
}

// ================================
// SHOW ABSENT SUMMARY
// ================================
function showSummary() {
    document.getElementById("roll").style.display = "none";
    document.getElementById("instruction").style.display = "none";

    const absentRolls = Object.keys(attendance)
        .filter(r => attendance[r] === "ABSENT");

    document.getElementById("absent-list").innerText =
        absentRolls.length
            ? absentRolls.join(", ")
            : "No absentees 🎉";

    document.getElementById("summary").style.display = "block";
}

// ================================
// FINAL CONFIRM SUBMIT
// ================================
async function finalSubmit() {
    try {
        await fetch("http://localhost:5000/api/attendance/final-submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                attendance
            })
        });

        alert("✅ Attendance submitted successfully");
        window.location.href = "dashboard.html";

    } catch {
        alert("❌ Failed to submit attendance");
    }
}

// ================================
// INIT
// ================================
loadRollNos();
