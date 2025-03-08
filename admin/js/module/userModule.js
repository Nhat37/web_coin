import { fetchUsers, createUser, updateUser, deleteUser } from "../api/userApi.js";

const userList = document.getElementById("userList");
const userForm = document.getElementById("userForm");

// 🛠 Xử lý submit form để tạo user mới
userForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(userForm);
    const newUser = {
        name: formData.get("name"),
        coin: Number(formData.get("coin")),
    };

    await createUser(newUser);
    userForm.reset();
    renderUsers();
});

// 🎯 Event Delegation để xử lý Edit & Delete
userList.addEventListener("click", async (e) => {
    const userId = e.target.dataset.id;

    if (e.target.classList.contains("edit-btn")) {
        const newName = prompt("Cập nhật tên:");
        if (newName) {
            await updateUser(userId, { name: newName });
            renderUsers();
        }
    }

    if (e.target.classList.contains("delete-btn")) {
        if (confirm("Bạn có chắc muốn xóa?")) {
            await deleteUser(userId);
            renderUsers();
        }
    }
});

// 📝 Render danh sách user
export async function renderUsers() {
    const users = await fetchUsers();
    userList.innerHTML = users.map(user => `
        <tr>
            <td>${user.name}</td>
            <td>${user.coin}</td>
            <td>
                <button class="btn-update" data-id="${user.id}">Sửa</button>
                <button class="btn-delete" data-id="${user.id}">Xóa</button>
            </td>
        </tr>
    `).join("");
}

// 🚀 Khởi chạy
renderUsers();
