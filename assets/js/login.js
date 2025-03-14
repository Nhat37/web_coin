const API_LOGIN_URL = "http://localhost:3000/login"
// import {BASE_URL} from './env.js'
document.querySelector('form').addEventListener('submit',async (e)=>{
    e.preventDefault()
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    try {
        const response = await fetch(`https://82d0-118-71-62-83.ngrok-free.app/api/login`,{
            method: "post",
            headers: {'Content-type':'application/json'},
            body: JSON.stringify({email,password})
        })
        const data = await response.json()
        if(response.ok){
            localStorage.setItem("token",data.token)
            // localStorage.setItem("name",data.name)
            localStorage.setItem("email",data.email)
            console.log(data.token || "no-token")
            // debugger;
            // if (data?.token === "admin-token") {
            //     alert("succesefully")
            //     window.location.href = "assets/html/admin.html";
            // } else {
            //     window.location.href = "/assets/index.html";
            // }
        }else{
            throw new Error(data?.message || `Lỗi: ${response.status} - ${response.statusText}`)
        }
        
        
        
    } catch (error) {
        console.log(error)
    }
})