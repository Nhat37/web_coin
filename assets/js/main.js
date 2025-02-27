const navItems = document.querySelectorAll('.nav_item')
const contentItems = document.querySelectorAll('.content__item')
const navTitle = document.querySelector('.header__nav--title h1')

function removeActive(arrItems){
    for(let i of arrItems){
        if(i.classList.contains('active')){
            i.classList.remove('active')
            break;
        }
    }
}

navItems.forEach((item, index)=>{
    item.addEventListener('click',()=>{
        removeActive(navItems)
        removeActive(contentItems)

        item.classList.add('active')
        contentItems[index].classList.add('active')
        navTitle.innerText = item.innerText
    })
})
