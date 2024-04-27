class File{
    async downloadFile(fileId, fileName) {
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
            error: function () {
                alert('서버 오류입니다. 잠시 후 다시 시도해주세요.');
            }
        })
    }
}