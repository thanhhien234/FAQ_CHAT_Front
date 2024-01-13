var lastDate = "";
function sendMessage() {
    var message = $("#messageInput").val();
    if (message.trim() !== "") {
        var container;
        var showTime = false;
        var showDate = false;

        if ($(".chatbot-message-container").is(":visible")) {
            container = $(".chatbot-message-container");
        } else if ($(".instructor-message-container").is(":visible")) {
            container = $(".instructor-message-container");
            showTime = true;
            showDate = true;
        }

        if (container) {
            var currentTime = new Date();
            var hours = currentTime.getHours();
            var minutes = currentTime.getMinutes();
            var period = hours >= 12 ? "오후" : "오전";
            hours = hours % 12 || 12;

            var formattedTime = period + " " + (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes;
            if (showDate && container.hasClass('instructor-message-container')) {
                var dayOfWeek = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
                var formattedDate = currentTime.getFullYear() + "년 " + (currentTime.getMonth() + 1) + "월 " + currentTime.getDate() + "일 " + dayOfWeek[currentTime.getDay()];
                if (formattedDate !== lastDate) {
                    container.append(`
                        <div class="date">${formattedDate}</div>
                    `);
                    lastDate = formattedDate;
                }
            }
            container.append(`
                <div class="question-container">
                    <div class="question">${message}</div>
                </div>
            `);
            container.find('.question-time-container').remove();
            if (showTime) {
                container.append(`
                    <div class="question-time-container">
                        <div class="time">${formattedTime}</div>
                    </div>
                `);
            }

            $("#messageInput").val("");
            container.scrollTop(container[0].scrollHeight);  // scroll to bottom

            // Sample reply
            var reply = "I don't have knowledge of that particular string of characters or any meaningful information associated with it. ";

            container.append(`
                <div class="answer-container">
                    <div class="answer">${reply}</div>
                </div>
            `);
            if (showTime) {
                container.append(`
                    <div class="answer-time-container">
                        <div class="time">${formattedTime}</div>
                    </div>
                `);
            }
            container.scrollTop(container[0].scrollHeight);
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
