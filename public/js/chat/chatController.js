const chat = new Chat();
chat.greeting();

$("#submit").on("click", function () {
    chat.sendMessage();
    $("#messageInput").val("");
});

$("#messageInput").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        $("#submit").click();
    }
});
