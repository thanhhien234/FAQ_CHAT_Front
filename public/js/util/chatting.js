function sendMessage() {
    var message = $("#messageInput").val();
    if (message.trim() !== "") {
        var container;

        if ($(".chatbot-message-container").is(":visible")) {
            container = $(".chatbot-message-container");
        } else if ($(".instructor-message-container").is(":visible")) {
            container = $(".instructor-message-container");
            chatToInstructor(message)
        }
    }
}

$("#submit").on("click", function () {
    sendMessage();
});

$("#messageInput").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
        $("#messageInput").val("");
    }
});
