async function authRegister(studentId, email) { 
    await $.ajax({
        url: config.authServer +'/api/auth/register',
        type: 'POST',
        headers: {
            Authorization: "Bearer " + getCookie("accessToken")
        },
        data: JSON.stringify({
            studentId: studentId,
            email: email
        }),
        contentType: 'application/json; charset=utf-8',
        
        success: function(response) {
            location.href = "/";
            console.log('success authRegister');
        },
        error: function(err) {
            console.log('failed authRegister');
            console.log(err);
        }
    });
}
