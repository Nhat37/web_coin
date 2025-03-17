import { CONFIG } from "../config.js";
export async function getTasks() {
    try {
        const response = await fetch(`${CONFIG.BASE_URL_API}/api/daily-tasks`,{
            method: 'GET',
            headers: {
                "ngrok-skip-browser-warning":true,
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });
        return await response.json();
    } catch (error) {
        console.error("Lỗi khi lấy nhiệm vụ:", error);
        return [];
    }
}

export async function addTask(task) {
    try {
        const response = await fetch(`${CONFIG.BASE_URL_API}`, {
            method: "POST",
            headers: { 
                "ngrok-skip-browser-warning":true,
                "Content-Type": "application/json" },
            body: JSON.stringify(task),
        });
        return await response.json();
    } catch (error) {
        console.error("Lỗi khi thêm nhiệm vụ:", error);
    }
}

export async function updateTask(taskId, updatedTask) {
    try {
        const response = await fetch(`${CONFIG.BASE_URL_API}/${taskId}`, {
            method: "PUT",
            headers: { 
                "ngrok-skip-browser-warning":true,
                "Content-Type": "application/json" },
            body: JSON.stringify(updatedTask),
        });
        return await response.json();
    } catch (error) {
        console.error("Lỗi khi cập nhật nhiệm vụ:", error);
    }
}

export async function deleteTask(taskId) {
    try {
        await fetch(`${CONFIG.BASE_URL_API}/${taskId}`, { 
            method: "DELETE",
            headers:{
                "ngrok-skip-browser-warning":true,
            }
        });
    } catch (error) {
        console.error("Lỗi khi xóa nhiệm vụ:", error);
    }
}
