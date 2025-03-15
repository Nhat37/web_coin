import { CONFIG } from "../config.js";

async function getUserInfo() {
    const token = localStorage.getItem('token');
    if(!token){
        window.location.href = "/assets/page/auth.html";
        return;
    }

    try {
        const response = await fetch(`${CONFIG.BASE_URL_API}/api/me`, {
            method: 'GET',
            headers: {
                "ngrok-skip-browser-warning":true,
                'Authorization': `Bearer ${token}`
            }
        });
    
        if (!response.ok) {
            localStorage.removeItem("token");
            window.location.href = "/assets/page/auth.html"
            return;
        } 

        const user = await response.json();
        localStorage.setItem("userId",user.id);
        localStorage.setItem("name",user.name);
        if(!window.location.pathname.includes("index.html")){
            alert("Chuyển đến index!");
            setTimeout(()=>window.location.href = "/assets/index.html");
        }

    } catch (error) {
        alert("Lỗi API: ",window.location.pathname,":",error);
        window.location.href =  "/assets/index.html";
    }
}

getUserInfo();
