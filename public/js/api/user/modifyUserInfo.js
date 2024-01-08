async function modifyUserInfo(newStudentId,newName) {
    await $.ajax({
        url: config.authServer +'/api/user',
        type: 'PUT',
        headers: {
            Authorization: "Bearer " + getCookie("accessToken")
        },
        data: JSON.stringify({
            studentId: newStudentId,
            name: newName
        }),
        contentType: 'application/json; charset=utf-8',
        
        success: function(response) {
            console.log('ModifyUserInfo success');
        },
        error: function(err) {
            console.error(err);
        }
    });
}