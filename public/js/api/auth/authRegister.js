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
        },
        error: function(err) {
            console.error(err);
        }
    });
}
