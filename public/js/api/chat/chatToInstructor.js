async function chatToInstructor(comment) {
    await $.ajax({
        url: config.chatServer + "/api/student",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        headers: {
            Authorization: "Bearer " + getCookie("accessToken")
        },
        data: JSON.stringify({
            "comment": comment
        }),

        success: function (res) {
            console.log(res);
        },
        error: function (err) {
            console.error(err);
        }
    })
}