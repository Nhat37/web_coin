import { CONFIG } from "./config.js";
document.addEventListener("DOMContentLoaded", function () {
    const walletInput = document.getElementById("wallet-address");
    const connectBtn = document.querySelector(".connect-btn");

    // Danh sách ví gợi ý
    const walletSuggestions = [
        "vitalik.eth",
        "alicewallet.eth",
        "bobcrypto.eth",
        "mywallet.eth",
        "testaccount.eth",
        "dappuser.eth",
        "smartcontract.eth"
    ];

    // Tạo phần tử danh sách gợi ý
    let suggestionBox = document.createElement("div");
    suggestionBox.classList.add("wallet-list");
    suggestionBox.style.display = "none";
    walletInput.parentNode.appendChild(suggestionBox);

    // Hiển thị danh sách gợi ý khi nhập
    walletInput.addEventListener("input", function () {
        let value = walletInput.value.trim();
        suggestionBox.innerHTML = ""; 
        if (value.length > 0) {
            let filtered = walletSuggestions.filter(wallet => wallet.includes(value));
            if (filtered.length > 0) {
                suggestionBox.style.display = "block";
                filtered.forEach(wallet => {
                    let option = document.createElement("div");
                    option.classList.add("wallet-option");
                    option.textContent = wallet;
                    option.addEventListener("click", function () {
                        walletInput.value = wallet;
                        suggestionBox.style.display = "none"; 
                    });
                    suggestionBox.appendChild(option);
                });
            } else {
                suggestionBox.style.display = "none";
            }
        } else {
            suggestionBox.style.display = "none";
        }
    });

    connectBtn.addEventListener("click", function () {
        let walletAddress = walletInput.value.trim();
        if (walletAddress === "") {
            alert("Vui lòng nhập địa chỉ ví trước khi kết nối!");
            return;
        }

        try {
            const response = fetch(`${CONFIG.BASE_URL_API}/api/connect-wallet`,{
                method:"post",
                headers:{"ngrok-skip-browser-warning": true},
                body: JSON.stringify(walletAddress)
            })
            if(!response.ok){
                alert("Địa chỉ ví có gì đó sai rồi!");
                return;
            }
            const data = response.json();
            console.log("in: ",data);
            debugger;
            window.location.href = "../index.html";
        } catch (error) {
            console.log("Lỗi Api metamask_connect: ", error);
        }
    });
});
function goBack() {
    window.history.back();
}