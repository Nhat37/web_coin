import { CONFIG } from "../config.js"; 

export async function getUsers() {
    try {
        const response = await fetch(`${CONFIG.BASE_URL_API}/api/users`,{
            method: 'GET',
            headers: {
                "ngrok-skip-browser-warning":true,
                // 'Authorization': `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (error) {
        console.error("Lỗi khi lấy danh sách user:", error);
        return [];
    }
}

export async function addUser(user) {
    try {
        const response = await fetch(`${CONFIG.BASE_URL_API}/api/users`, {
            method: "POST",
            headers: { 
                "ngrok-skip-browser-warning":true,
                "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });
        return await response.json();
    } catch (error) {
        console.error("Lỗi khi thêm user:", error);
    }
}

export async function updateUser(userId, updatedUser) {
    try {
        const response = await fetch(`${API_USER_URL}/api/users/${userId}`, {
            method: "PUT",
            headers: { 
                "ngrok-skip-browser-warning":true,
                "Content-Type": "application/json" },
            body: JSON.stringify(updatedUser),
        });
        return await response.json();
    } catch (error) {
        console.error("Lỗi khi cập nhật user:", error);
    }
}

export async function deleteUser(userId) {
    try {
        await fetch(`${API_USER_URL}/api/users/${userId}`, {
            method: "DELETE",
            headers: {"ngrok-skip-browser-warning":true}
        });
    } catch (error) {
        console.error("Lỗi khi xóa user:", error);
    }
}
