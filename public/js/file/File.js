class File{
    async downloadFile(fileId, fileName) {
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
            error: function () {
                alert('서버 오류입니다. 잠시 후 다시 시도해주세요.');
                $('#loadingModal').modal('hide');
            }
        })
    }
}