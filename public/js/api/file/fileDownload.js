async function fileDownload(fileId, fileName) {
    await $.ajax({
        url: config.fileServer + "/api/file/" + fileId,
        type: "GET",
        headers: {
            Authorization: "Bearer " + getCookie("accessToken")
        },
        success: function (res) {
            const file = new Blob([res]);
            const a = document.createElement("a");
            a.href = window.URL.createObjectURL(file);
            a.download = fileName;
            a.click();
        },
        error: function (err) {
            console.error(err);
        }
    })
}