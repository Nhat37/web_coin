const API_LOGIN_URL = "http://localhost:3000/login"

document.querySelector('form').addEventListener('submit',async (e)=>{
    e.preventDefault()
    const formData = new FormData(e.target)
    const name = formData.get("name")
    const password = formData.get("password")

    try {
        const response = await fetch(API_LOGIN_URL,{
            method: "POST",
            headers: {'Content-type':'application/json'},
            body: JSON.stringify({name,password})
        })

        if(!response.ok){
            throw new Error(`Lỗi: ${response.status} - ${response.statusText}`)
        }
        const data = await response.json()        
       
        localStorage.setItem("token",data.token)
        localStorage.setItem("name",data.name)

        if (data?.token === "admin-token") {
            window.location.href = "/admin/admin.html";
        } else {
            window.location.href = "/assets/index.html";
        }
        
        
    } catch (error) {
        console.log(error)
    }
})
