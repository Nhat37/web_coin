const navItems = document.querySelectorAll('.nav__item')
const contentItems = document.querySelectorAll('.content__item')
const navTitle = document.querySelector('.header__nav--title h1')

// xóa class active
function removeActive(arrItems){
    for(let i of arrItems){
        if(i.classList.contains('active')){
            i.classList.remove('active')
            break;
        }
    }
}

// chuyển nav main khi click
navItems.forEach((item, index)=>{
    item.addEventListener('click',()=>{
        removeActive(navItems)
        removeActive(contentItems)

        item.classList.add('active')
        contentItems[index].classList.add('active')
        navTitle.innerText = item.innerText
        document.querySelector('input#nav__mobile').checked = false
    })
})

const btnConvert = document.querySelector(".btn__recent--convert")
const modals = document.querySelectorAll(".modal__wrapper")
const modalConvert = modals[0]
export const modalAward = modals[1]

// mở modal convert
btnConvert.addEventListener('click',(e)=>{
    modalConvert.classList.add("modal__convert")
    const formConvert = modalConvert.querySelector('form.modal__content')
    let labels = formConvert.querySelectorAll(".modal__label")
    let inputs = formConvert.querySelectorAll("input")
    const iconSwap = formConvert.querySelector('.modal__content--icon img')

    // ratio: tỉ lệ
    function inputSwap(ratio){
        inputs[1].value = (Number(inputs[0].value.trim())*ratio).toString()
        inputs[0].focus()
        inputs[0].value=""
    }
    // đổi chỗ label
    function swap(labelArray){
        let labelTemp = labelArray[0].innerText
        labelArray[0].innerText = labelArray[1].innerText
        labelArray[1].innerText = labelTemp
    }

    iconSwap.onclick = ()=>swap(labels)

    formConvert.onsubmit = (e)=>{
        e.preventDefault()
        if(labels[0].innerText.toUpperCase() === "USDT")
            inputSwap(100)
        else 
            inputSwap(0.01)
        
    }
    // dong modal khi click button "hủy"
    closeModal(modalConvert,'modal__convert',formConvert)
    // dong modal khi click vao vung ngoai modal??
    modalConvert.onclick = (e)=>{
        if(!e.target.closest('.modal')){
            modalConvert.classList.remove('modal__convert')
        }
    }
})

// dong modal
export function closeModal(modal,modalClass,modalForm){
    const btnDestroy = modalForm.querySelector('.modal__btn--nochange')
    btnDestroy.addEventListener('click',()=>{
        modal.classList.remove(modalClass)
    })
}

//dsach nhiệm vụ: bấm button chuyển task list
const toggleTaskList = (showNew)=>{
    document.querySelector('.task__newList').classList.toggle('hidden',!showNew)
    document.querySelector('.task__processingList').classList.toggle('hidden',showNew)
}
// có thể dùng removeActive()
function toggleBtnOutline(btnCurrent,btnOther,isNotOutline){
    btnCurrent.classList.toggle('active',isNotOutline)
    btnOther.classList.toggle('active',!isNotOutline)
    
}
const btnFilterNew = document.querySelector('.btn__filter--new')
const btnFilterCurrent = document.querySelector('.btn__filter--current')
btnFilterNew.addEventListener('click',function(){
    toggleTaskList(true)
    toggleBtnOutline(this,btnFilterCurrent,true) //###
})
btnFilterCurrent.addEventListener('click',function(){
    toggleTaskList(false)
    toggleBtnOutline(this,btnFilterNew,true)
})
// sắp xếp nhiệm vụ bằng select điểm thưởng, thời gian
let selectTaskInput = document.querySelector('.task__sort--input')
selectTaskInput.onchange = (e)=>{
    const sortBy = e.target.value
    // lấy newList ko có .hidden hoặc lấy processingList ko có .hidden
    const taskListContainer = document.querySelector('.task__newList:not(.hidden), .task__processingList:not(.hidden)')
    const tasks = Array.from(taskListContainer.querySelectorAll('.col'))

    tasks.sort((a, b)=>{
        //doi tgian ra giay
        const timeToSeconds = (timeStr)=>{
            const [hours, minutes, seconds] = timeStr.split(":").map(Number)
            return hours*3600 + minutes*60 + seconds
        }

        const aValue = 
        sortBy === "1" ? timeToSeconds(a.querySelector('.task__item--time').innerText) : Number(a.querySelector('.task__item--coin span').innerText)
        const bValue = 
        sortBy === "1" ? timeToSeconds(b.querySelector('.task__item--time').innerText) : Number(b.querySelector('.task__item--coin span').innerText)

        return aValue > bValue ? 1 : -1 //nếu a>b thì đổi vị trí
    })

    taskListContainer.innerHTML = "" //xóa để tránh bị trùng lặp dl
    tasks.forEach((task)=>{
        taskListContainer.appendChild(task)
    })
}
// format date
export function formatDate(date) {
    return new Intl.DateTimeFormat('vi-VN', { 
        day: '2-digit', month: '2-digit', year: 'numeric' 
    }).format(date) + " - " + date.toTimeString().slice(0, 5);
}
