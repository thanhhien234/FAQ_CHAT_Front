async function modifyFile(fileId, name) {
    await $.ajax({
        url: config.fileServer + '/api/auth/file?' + 'fileId=' + fileId + '&name=' + name,
        type: 'PATCH',
        headers: {
            Authorization: "Bearer " + getCookie("accessToken")
        },
        data: JSON.stringify({
            fileId: fileId,
            name: name,
        }),
        success: function(response) {
            console.log('Modify File success');
        },
        error: function(err) {
            console.error(err);
        }
    });
}