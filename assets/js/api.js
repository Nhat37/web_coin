import { createTaskHTML } from "./testAPI";
// register
async function register() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();
    console.log("User đăng ký:", data);
}

// log in  
async function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (data.token) {
        localStorage.setItem("token", data.token); // Lưu token để xác thực
        console.log("Đăng nhập thành công!");
    } else {
        console.log("Đăng nhập thất bại!");
    }
}
// get Task List
async function fetchTasks() {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/tasks", {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` } //xác thực với backend
    });

    const tasks = await response.json();
    document.querySelector(".task__newList").innerHTML = tasks.map(task => createTaskHTML(task, "new")).join("");
}
// add task
async function addTask(taskName) {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: taskName })
    });

    const newTask = await response.json();
    console.log("Nhiệm vụ mới:", newTask);
}
// update

// delete
async function deleteTask(taskId) {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
    });

    console.log(`Nhiệm vụ ${taskId} đã bị xóa`);
}
