async function reissue() {
    await $.ajax({
        type: "POST",
        url: config.authServer + "/api/auth/reissue",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            refreshToken: getCookie("refreshToken")
        }),
        success: function (res) {
            setCookie("accessToken", res.accessToken, 2 * 60);
            setCookie("refreshToken", res.refreshToken, 24 * 14 * 60);
        },
        error: function (err) {
            console.error(err);
        }
    })
}