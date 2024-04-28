async function loginCheck() {
    if (!getCookie("accessToken") && !getCookie("refreshToken")) {
        location.replace("/login.html");
    } else if (!getCookie("accessToken")) {
        await reissue();
    } else if (getCookie("isActive") != "ACTIVE") {
        window.location.href = '/register.html';
    }
}

loginCheck().then(() => {
    $("#chatbot-menu").trigger("click"); //initially
});