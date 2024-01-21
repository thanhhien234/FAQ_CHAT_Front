let resData;
$(document).on("click", ".download-button", function () {
    const fileId = $(this).data("fileid");
    console.log('click:',fileId)
    const fileData = resData.fileGetListElementResList.find(file => file.id === fileId);

    if (fileData) {
        fileDownload(fileId, fileData.fileName);
        console.log('download sucess',fileData.fileName)
    } else {
        console.error("File not found: ", fileId);
    }
});