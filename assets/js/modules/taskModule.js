import { getTasks, addTask, updateTask, deleteTask } from "../api/taskApi.js";

const taskList = document.getElementById("taskList");
const taskForm = document.getElementById("taskForm");

// Biến lưu nhiệm vụ đang chỉnh sửa
let editingTaskId = null;

//  Load danh sách nhiệm vụ
export async function renderTasks() {
    const tasks = await getTasks();
    taskList.innerHTML = ""; // Xóa danh sách cũ
    tasks.forEach(addTaskToDOM);
}

//  Thêm hoặc cập nhật nhiệm vụ
taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(taskForm);
    const taskData = {
        title: formData.get("title"),
        description: formData.get("description"), 
        duration: formData.get("duration"),
        coin_reward: Number(formData.get("coin_reward")),
    };

    if (editingTaskId) {
        // Nếu đang chỉnh sửa → Cập nhật nhiệm vụ
        await updateTask(editingTaskId, taskData);
        updateTaskInDOM(editingTaskId, taskData);
        editingTaskId = null; // Reset trạng thái
    } else {
        // Nếu không → Thêm mới nhiệm vụ
        const newTask = await addTask(taskData);
        if (newTask) addTaskToDOM(newTask);
    }

    taskForm.reset(); 
});

//  Thêm nhiệm vụ vào DOM
function addTaskToDOM(task) {
    const row = document.createElement("tr");
    row.dataset.id = task.id;
    row.innerHTML = `
        <td>${task.title}</td> 
        <td>${task.description}</td> 
        <td>${task.duration}</td>
        <td>${task.coin_reward}</td>
        <td>
            <button class="btn-update" data-id="${task.id}">Sửa</button>
            <button class="btn-delete" data-id="${task.id}">Xóa</button>
        </td>`
    taskList.appendChild(row);
}

//  Cập nhật nhiệm vụ trong DOM (không reload toàn bộ)
function updateTaskInDOM(taskId, updatedTask) {
    const row = document.querySelector(`tr[data-id='${taskId}']`);
    if (row) {
        row.cells[0].textContent = updatedTask.title; 
        row.cells[1].textContent = updatedTask.description; 
        row.cells[2].textContent = updatedTask.duration;
        row.cells[3].textContent = updatedTask.coin_reward;
    }
}

//  Xử lý sự kiện Sửa / Xóa bằng Event Delegation
taskList.addEventListener("click", async (e) => {
    const taskId = e.target.dataset.id;
    const row = e.target.closest("tr");

    //  Sửa nhiệm vụ
    if (e.target.classList.contains("btn-update")) {
        editingTaskId = taskId; // Lưu ID nhiệm vụ đang sửa
        taskForm.elements["title"].value = row.cells[0].textContent; 
        taskForm.elements["description"].value = row.cells[1].textContent; 
        taskForm.elements["duration"].value = row.cells[2].textContent;
        taskForm.elements["coin_reward"].value = row.cells[3].textContent;
        taskForm.elements["title"].focus();
    }

    // Xóa nhiệm vụ
    if (e.target.classList.contains("btn-delete")) {
        if (confirm("Bạn có chắc muốn xóa?")) {
            await deleteTask(taskId);
            row.remove();
        }
    }
});

renderTasks();
