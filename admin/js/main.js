document.addEventListener("DOMContentLoaded", () =>{    
    const navItems = document.querySelectorAll('.nav-item')
    const tabContents = document.querySelectorAll('.tab-content')
    
    // chuyen tab
    navItems.forEach((item,index)=>{
        item.addEventListener('click',(e)=>{
            document.querySelector('.nav-item.active').classList.remove('active')
            document.querySelector('.tab-content.active').classList.remove('active')
            item.classList.add('active')
            tabContents[index].classList.add('active')
        })
    })

    // Fake API Data
    let tasks = [
        { id: 1, todo: "Học Angular", time: "01:00:00", coin: 100 },
        { id: 2, todo: "Luyện tập TypeScript", time: "00:45:00", coin: 80 }
    ];

    let users = [
        { id: 1, name: "Nguyễn Văn A", coin: 500 },
        { id: 2, name: "Trần Thị B", coin: 300 }
    ];

    const taskList = document.getElementById("taskList");
    const userList = document.getElementById("userList");

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach(task => {
            taskList.innerHTML += `
                <tr>
                    <td>${task.todo}</td>
                    <td>${task.time}</td>
                    <td>${task.coin}</td>
                    <td>
                        <button class = "btn-update" onclick="editTask(${task.id})">Sửa</button>
                        <button class = "btn-delete" onclick="removeTask(${task.id})">Xóa</button>
                    </td>
                </tr>
            `;
        });
    }

    function renderUsers() {
        userList.innerHTML = "";
        users.forEach(user => {
            userList.innerHTML += `
                <tr>
                    <td>${user.name}</td>
                    <td>${user.coin}</td>
                    <td>
                        <button class = "btn-update" onclick="editUser(${user.id})">Sửa</button>
                        <button class = "btn-delete" onclick="removeUser(${user.id})">Xóa</button>
                    </td>
                </tr>
            `;
        });
    }

    document.getElementById("taskForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newTask = {
            id: tasks.length + 1,
            todo: formData.get("todo"),
            time: formData.get("time"),
            coin: parseInt(formData.get("coin"))
        };
        tasks.push(newTask);
        renderTasks();
        e.target.reset();
    });

    document.getElementById("userForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newUser = {
            id: users.length + 1,
            name: formData.get("name"),
            coin: parseInt(formData.get("coin"))
        };
        users.push(newUser);
        renderUsers();
        e.target.reset();
    });

    renderTasks();
    renderUsers();
})
