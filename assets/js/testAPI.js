const todosAPI = "https://dummyjson.com/todos"

start()

function start() {
    getTasks(renderTasks)
}


function getTasks(callback) {
    fetch(todosAPI)
        .then((response) => {
            return response.json()
        })
        .then(callback)
        .catch(err => {
            console.log(err)
        })
}

function renderTasks(todos) {
    const newTaskList = document.querySelector('.task__newList')
    const processingTaskList = document.querySelector('.task__processingList')

    const fakeTask = [
        { "id": 132, "todo": "Do something nice for someone you care about", "completed": "0:3:00", "userId": 152 },
        { "id": 21, "todo": "Memorize a poem", "completed": "3:3:05", "userId": 133 },
        { "id": 176, "todo": "Watch a classic movie", "completed": "0:0:10", "userId": 68 },
        { "id": 400, "todo": "Watch a documentary", "completed": "1:3:00", "userId": 84 }
    ]
    const todoList = todos["todos"]

    newTaskList.innerHTML = fakeTask.map((task) => {
        return `<div class="col l-12 m-12 c-12">                                        
            <div class="task__item new">
                <div class="task__item--title">Nhiệm vụ ${task.id}:</div>
                <div class="task__item--body f-between">
                    <div class="task__item--text">${task.todo}</div>
                    <div class="task__item--number">
                        <div class="task__item--coin"><span>${task.userId} </span>Coin</div>
                        <div class="task__item--time">${task.completed}</div>
                    </div>
                </div>
                <div class="task__item--footer">
                    <button class="btn__task--submit">Nhận nhiệm vụ</button>
                    <button class="btn__task--delete btn__danger hidden">Xóa</button>
                </div>
            </div>                
        </div>`
    }).join('')

    // processingTaskList.innerHTML = todoList.map((todo)=>{            
    //     return `<div class="col l-12 m-12 c-12">                                        
    //         <div class="task__item ${todo.completed ? 'success' : 'over'}">
    //             <div class="task__item--title">Nhiệm vụ ${todo.id}:</div>
    //             <div class="task__item--body f-between">
    //                 <div class="task__item--text">${todo.todo}</div>
    //                 <div class="task__item--number">
    //                     <div class="task__item--coin"><span>${todo.userId} </span>Coin</div>
    //                     <div class="task__item--time">${todo.completed}</div>
    //                 </div>
    //             </div>
    //             <div class="task__item--footer">
    //                 <button class="btn__task--submit" data-id="${todo.id}">${todo.completed ? "Nhận thưởng" : "Quá hạn"}</button>
    //                 <button class="btn__task--delete btn__danger" data-id="${todo.id}">Xóa</button>
    //             </div>
    //         </div>                
    //     </div>`
    // }).join('')

    newTaskList.addEventListener("click", (e) => {
        handleAddTask(e)
    })
    processingTaskList.addEventListener("click", (e) => {
        handleDeleteTask(e)
        handleProcessing()
    })
    // Lắng nghe sự kiện click vào danh sách nhiệm vụ mới
    function handleAddTask(event) {
        if (event.target.classList.contains("btn__task--submit")) {
            const taskItem = event.target.closest(".task__item.new");

            if (taskItem) {
                event.target.innerText = "Xác nhận hoàn thành";

                // Cập nhật class để phân biệt
                taskItem.classList.replace("new", "processing");
                taskItem.querySelector('.btn__task--delete').classList.remove('hidden')

                // Thêm vào danh sách nhiệm vụ đang thực hiện
                processingTaskList.prepend(taskItem);
                let timeElemnt = taskItem.querySelector('.task__item--time')
                let timeStr = timeElemnt.innerText
                let [hours, minutes, secondes] = timeStr.split(":").map(Number)
                let timeToSeconds = hours * 3600 + minutes * 60 + secondes

                let countDown = setInterval(() => {
                    if (timeToSeconds <= 1) {
                        clearInterval(countDown)
                    }
                    timeToSeconds--
                    let h = Math.floor(timeToSeconds / 3600)
                    let m = Math.floor((timeToSeconds % 3600) / 60)
                    let s = timeToSeconds % 60
                    timeElemnt.innerText = `${h < 10 ? "0" : ""}${h}:${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`
                }, 1000)
            }

        }
    }

    function handleDeleteTask(event) {
        if (event.target.classList.contains('btn__task--delete')) {
            let btnDelete = event.target
            let isDelete = confirm("Bạn có chắc chắn xóa nhiệm vụ này?")
            if (isDelete) {
                const taskItem = btnDelete.closest('.task__item')
                taskItem.remove()
            }
        }
    }

    function handleProcessing() {

    }
}

