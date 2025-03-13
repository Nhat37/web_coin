const API_LOGIN_URL = "http://localhost:3000/login"

document.querySelector('form').addEventListener('submit',async (e)=>{
    e.preventDefault()
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    try {
        const response = await fetch(API_LOGIN_URL,{
            method: "POST",
            headers: {'Content-type':'application/json'},
            body: JSON.stringify({email,password})
        })
        const data = await response.json()
      
        if(response.ok){
            // localStorage.setItem("token",data.token)
            // localStorage.setItem("name",data.name)
            localStorage.setItem("name",data.email)
            console.log(data.token || "no-token")
            debugger;
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