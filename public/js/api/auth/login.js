async function login(code) {
    await $.ajax({
        type: "GET",
        url: config.authServer + "/api/auth/login?code=" + code,
        success: function (res) {
            setCookie("accessToken", res.accessToken, 2 * 60);
            setCookie("refreshToken", res.refreshToken, 14 * 60 * 60);
            if (res.registerStateEnum === "INACTIVE") {
                // 사용자 정보 입력 페이지로 이동
            } else {
                // 채팅 페이지로 이동
            }
        },
        error: function (err) {
            alert("관리자에게 문의하세요.");
            // 로그인 페이지로 이동
        }
    })
}