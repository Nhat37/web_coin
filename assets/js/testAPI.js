var todosAPI = "https://dummyjson.com/todos"

fetch(todosAPI)
    .then((response)=>{
        return response.json()
    })
    .then((todos)=>{
        const fakeTask = [{
            "id": 132,
            "todo": "Do something nice for someone you care about",
            "completed": "0:3:00",
            "userId": 152
          },
          {
            "id": 21,
            "todo": "Memorize a poem",
            "completed": "3:3:05",
            "userId": 133
          },
          {
            "id": 176,
            "todo": "Watch a classic movie",
            "completed": "0:0:50",
            "userId": 68
          },
          {
            "id": 400,
            "todo": "Watch a documentary",
            "completed": "1:3:00",
            "userId": 84
          }]
        const newTaskList = document.querySelector('.task__newList')
        const processingTaskList = document.querySelector('.task__processingList')
        const todoList = todos["todos"]
        
        const htmlNew = fakeTask.map((task)=>{
            return `<div class="col l-12 m-12 c-12">                                        
                <div class="task__item new">
                    <div class="task__item--title">Nhiệm vụ ${task.id}:</div>
                    <div class="task__item--info f-between">
                        <div class="task__item--text">${task.todo}</div>
                        <div class="task__item--number">
                            <div class="task__item--coin"><span>${task.userId} </span>Coin</div>
                            <div class="task__item--time">${task.completed}</div>
                            <button class="btn__task--submit btn">Nhận nhiệm vụ</button>
                        </div>
                    </div>
                </div>                
            </div>`
        }).join('')
        newTaskList.innerHTML = htmlNew

        const htmlProcessing = todoList.map((todo)=>{            
            return `<div class="col l-12 m-12 c-12">                                        
                <div class="task__item ${todo.completed ? 'success' : 'over'}">
                    <div class="task__item--title">Nhiệm vụ ${todo.id}:</div>
                    <div class="task__item--info f-between">
                        <div class="task__item--text">${todo.todo}</div>
                        <div class="task__item--number">
                            <div class="task__item--coin"><span>${todo.userId} </span>Coin</div>
                            <div class="task__item--time">${todo.completed}</div>
                            <button class="btn__task--submit btn">${todo.completed ? "Nhận thưởng" : "Quá hạn"}</button>
                        </div>
                    </div>
                </div>                
            </div>`
        }).join('')
        processingTaskList.innerHTML = htmlProcessing
        // console.log(htmlNew)
    })
    .catch((error)=>{
        console.log(error)
    })