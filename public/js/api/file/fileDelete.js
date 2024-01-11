async function deleteFile(fileIdList) {
    await $.ajax({
        url: config.fileServer + '/api/auth/file?' + fileIdList.map(id => `fileIdList=${id}`).join('&'),
        type: 'DELETE',
        headers: {
            Authorization: "Bearer " + getCookie("accessToken")
        },
        data: JSON.stringify({
            fileIdList: fileIdList,
        }),
        
        success: function(response) {
            console.log('Delete File success');
        },
        error: function(err) {
            console.error(err);
        }
    });
}