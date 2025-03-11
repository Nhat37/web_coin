


// import { createTaskHTML } from "../testAPI";

// // get Task List
// export async function getTasks() {
//     const token = localStorage.getItem("token");

//     const response = await fetch("http://localhost:3000/tasks", {
//         method: "GET",
//         headers: { "Authorization": `Bearer ${token}` } //xác thực với backend
//     });

//     const tasks = await response.json();
//     document.querySelector(".task__newList").innerHTML = tasks.map(task => createTaskHTML(task, "new")).join("");
// }
// // add task
// export async function addTask(taskName) {
//     const token = localStorage.getItem("token");

//     const response = await fetch("http://localhost:3000/tasks", {
//         method: "POST",
//         headers: { 
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ name: taskName })
//     });

//     const newTask = await response.json();
//     console.log("Nhiệm vụ mới:", newTask);
// }
// // update

// // delete
// export async function deleteTask(taskId) {
//     const token = localStorage.getItem("token");

//     await fetch(`http://localhost:3000/tasks/${taskId}`, {
//         method: "DELETE",
//         headers: { "Authorization": `Bearer ${token}` }
//     });

//     console.log(`Nhiệm vụ ${taskId} đã bị xóa`);
// }
