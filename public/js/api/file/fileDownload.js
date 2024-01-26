async function fileDownload(fileId, fileName) {
    $('#loadingModal').modal('show');

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
            $('#loadingModal').modal('hide');
        },
        error: function (err) {
            console.error(err);
        }
    })
}