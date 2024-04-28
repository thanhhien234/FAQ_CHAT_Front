const loginCode = new URL(window.location).searchParams.get("code");
const accessTime = 2 * 60;
const refreshTime = 24 * 60 * 7;

if (!!loginCode) {
    $.ajax({
        url: config.authServer + '/api/auth/login?code=' + loginCode,
        type: "GET",
        success: function (res) {
            setCookie('accessToken', res.accessToken, accessTime);
            setCookie('refreshToken', res.refreshToken, refreshTime);
            setCookie('isActive', res.registerStateEnum, accessTime);
            if (res.registerStateEnum === "INACTIVE")
                window.location.href = '/register.html';
            else
                window.location.href = '/';
        },
        error: function (err) {
            alert("관리자에게 문의해주세요.");
            location.replace('/login.html');
        }
    })
} else {
    alert('잘못된 접근입니다.');
    window.location.href = '/';
}