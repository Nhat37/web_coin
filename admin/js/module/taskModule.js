import { fetchTasks, createTask, updateTask, deleteTask } from "../api/taskApi.js";

const taskList = document.getElementById("taskList");
const taskForm = document.getElementById("taskForm");

// 🛠 Xử lý submit form để tạo mới nhiệm vụ
taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(taskForm);
    const newTask = {
        todo: formData.get("todo"),
        time: formData.get("time"),
        coin: Number(formData.get("coin")),
    };

    await createTask(newTask);
    taskForm.reset();
    renderTasks();
});

// 🎯 Event Delegation để xử lý Edit & Delete
taskList.addEventListener("click", async (e) => {
    const taskId = e.target.dataset.id;

    if (e.target.classList.contains("edit-btn")) {
        const newTodo = prompt("Cập nhật nhiệm vụ:");
        if (newTodo) {
            await updateTask(taskId, { todo: newTodo });
            renderTasks();
        }
    }

    if (e.target.classList.contains("delete-btn")) {
        if (confirm("Bạn có chắc muốn xóa?")) {
            await deleteTask(taskId);
            renderTasks();
        }
    }
});

// 📝 Render danh sách nhiệm vụ
export async function renderTasks() {
    const tasks = await fetchTasks();
    taskList.innerHTML = tasks.map(task => `
        <tr>
            <td>${task.todo}</td>
            <td>${task.time}</td>
            <td>${task.coin}</td>
            <td>
                <button class="btn-update" data-id="${task.id}">Sửa</button>
                <button class="btn-delete" data-id="${task.id}">Xóa</button>
            </td>
        </tr>
    `).join("");
}

// 🚀 Khởi chạy
renderTasks();
