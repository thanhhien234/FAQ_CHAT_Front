let isChatbotResponse = false;
function sendMessage() {
    var message = $("#messageInput").val();
    if (message.trim() !== "") {
        if ($(".chatbot-wrapper").is(":visible")) {
            if (!isChatbotResponse) {
                $("#messageInput").prop("disabled", true);
                $("#submit").prop("disabled", true);
                isChatbotResponse = true;

                chatToChatbot(message).finally(() => {
                    $("#messageInput").prop("disabled", false);
                    $("#submit").prop("disabled", false);
                    isChatbotResponse = false;
                    $("#messageInput").focus();
                }); 
            }       
        } else if ($(".instructor-wrapper").is(":visible")) {
            $("#messageInput").prop("disabled", true);
            $("#submit").prop("disabled", true);
            chatToInstructor(message).finally(() => {
                $("#messageInput").prop("disabled", false);
                $("#messageInput").focus();
                $("#submit").prop("disabled", false);
            })
        }
    }
}

$("#submit").on("click", function () {
    sendMessage();
    $("#messageInput").val("");
});

$("#messageInput").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        $("#submit").click();
    }
});


function greeting() {
    const greetingMessage = "안녕하세요! 궁금한 것이 있으신가요?<br>아래 입력창에 질문해주세요.";
    const greetingContainer = $('<div class="answer-wrapper">');
    const greeting = $('<div class="answer">').html(greetingMessage);
    greetingContainer.append(greeting);
    $('.chatbot-wrapper').append(greetingContainer);
}
greeting();
