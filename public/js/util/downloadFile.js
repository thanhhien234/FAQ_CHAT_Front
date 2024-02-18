let resData;
$(document).on("click", ".download-button", function () {
    const fileId = $(this).data("fileid");
    const fileData = resData.find(file => file.id === fileId);

    if (fileData) {
        fileDownload(fileId,fileData.fileName);
    } else {
        console.error("File not found: ", fileId);
        alert("파일을 찾을 수 없습니다.");
    }
});