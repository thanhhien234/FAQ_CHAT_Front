async function fileListSearch(page, pageSize) {
    await $.ajax({
        url: config.fileServer + `/api/file/list?page=${page}&pageSize=${pageSize}`,
        type: "GET",
        headers: {
            Authorization: "Bearer " + getCookie("accessToken")
        },
        success: function (res) {
            console.log(res);
        },
        error: function (err) {
            console.error(err);
        }
    })
}