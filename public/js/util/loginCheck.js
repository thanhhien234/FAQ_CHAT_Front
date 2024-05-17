async function loginCheck() {
    if (!getCookie("accessToken") && !getCookie("refreshToken")) {
        location.replace("/login.html");
    } else if (!getCookie("accessToken") || !getCookie("isActive")) {
        await reissue();
    } else if (getCookie("isActive") != "ACTIVE" && window.location.pathname != "/register.html") {
        window.location.href = '/register.html';
    }
};

function logout() {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    deleteCookie("isActive");
    location.replace("/login.html");
};

loginCheck().then(() => {
    $("#chatbot-menu").trigger("click"); //initially
});