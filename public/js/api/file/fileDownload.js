async function fileDownload(fileId, fileName) {
    $('#loadingModal').modal('show');

    await $.ajax({
        url: config.fileServer + "/api/file/" + fileId,
        type: "GET",
        headers: {
            Authorization: "Bearer " + getCookie("accessToken")
        },
        xhrFields: {
            responseType: "blob",
        },
        success: function (res) {
            const blobURL = URL.createObjectURL(res);
            const a = document.createElement("a");
            a.href = blobURL;
            a.download = fileName;
            a.click();
            $('#loadingModal').modal('hide');
        },
        error: function (err) {
            console.error(err);
        }
    })
}