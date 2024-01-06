async function authRegister(studentId, name, email) { 
    await $.ajax({
        url: config.authServer +'/api/auth/register',
        type: 'POST',
        headers: {
            Authorization: "Bearer " + getCookie("accessToken")
        },
        data: JSON.stringify({
            studentId: studentId,
            name: name,
            email: email
        }),
        contentType: 'application/json; charset=utf-8',
        
        success: function(response) {
            console.log('Register Success:', studentId, name, email);
        },
        error: function(err) {
            console.error(err);
        }
    });
}
