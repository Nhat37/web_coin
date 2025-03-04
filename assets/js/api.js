const tasksAPI = "http://localhost:3000/tasks"

start()

function start(){
    getTasks(renderTasks)
}

function getTasks(callback){
    fetch(tasksAPI)
        .then(Response=>{
            return Response.json()
        })
        .then(callback)
        .catch(err=> console.log(err))
}

function renderTasks(tasks){
    const newTaskList = document.querySelector('.task__newList')
    const processingTaskList = document.querySelector('.task__processingList')

    newTaskList.innerHTML = tasks.map((task)=>{
        return `<div class="col l-12 m-12 c-12">                                        
            <div class="task__item new">
                <div class="task__item--title">Nhiệm vụ ${task.id}:</div>
                <div class="task__item--body f-between">
                    <div class="task__item--text">${task.content}</div>
                    <div class="task__item--number">
                        <div class="task__item--coin"><span>${task.coin} </span>Coin</div>
                        <div class="task__item--time">${task.time}</div>
                    </div>
                </div>
                <div class="task__item--footer">
                    <button class="btn__task--submit">Nhận nhiệm vụ</button>
                    <button class="btn__task--delete btn__danger hidden">Xóa</button>
                </div>
            </div>                
        </div>`
    }).join('')

    // function createProcessingTask(){
    //     processingTaskList.innerHTML = todoList.map((todo)=>{            
    //         return `<div class="col l-12 m-12 c-12">                                        
    //             <div class="task__item ${todo.completed ? 'success' : 'over'}">
    //                 <div class="task__item--title">Nhiệm vụ ${todo.id}:</div>
    //                 <div class="task__item--body f-between">
    //                     <div class="task__item--text">${todo.todo}</div>
    //                     <div class="task__item--number">
    //                         <div class="task__item--coin"><span>${todo.userId} </span>Coin</div>
    //                         <div class="task__item--time">${todo.completed}</div>
    //                     </div>
    //                 </div>
    //                 <div class="task__item--footer">
    //                     <button class="btn__task--submit" data-id="${todo.id}">${todo.completed ? "Nhận thưởng" : "Quá hạn"}</button>
    //                     <button class="btn__task--delete btn__danger" data-id="${todo.id}">Xóa</button>
    //                 </div>
    //             </div>                
    //         </div>`
    //     }).join('')
    // }
}
