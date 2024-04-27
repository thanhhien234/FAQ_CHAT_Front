const file = new File();

$('.file-container').on("click", '.download-button', function () {
    const fileId = $(this).data("fileid");
    const fileData = category.currentCategoryData.find(file => file.fileId === fileId);

    if (fileData) {
        file.downloadFile(fileId,fileData.fileName);
    } else {
        alert("파일을 찾을 수 없습니다.");
    }
});