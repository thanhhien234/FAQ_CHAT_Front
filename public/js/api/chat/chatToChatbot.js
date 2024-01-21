//학생이 챗붓의 답변 가져오기
async function chatToChatbot(question) {
    const questionChatbotContainer = $('<div class="question-container">');
    const questionChatbot = $('<div class="question">').text(question);
    questionChatbotContainer.append(questionChatbot);
    chatbotContainer.append(questionChatbotContainer);
    await $.ajax({
        url: config.chatServer + '/chat?question=' + question,
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        headers: {
            Authorization: "Bearer " + getCookie("accessToken")
        },
        success: function (res) {
            const answerChatbotContainer = $('<div class="answer-container">');
            const answerChatbot = $('<div class="answer">').text(res); 
            answerChatbotContainer.append(answerChatbot);
            chatbotContainer.append(answerChatbotContainer);
            
            chatbotContainer.scrollTop(chatbotContainer[0].scrollHeight); //scroll to bottom
        },
        error: function (err) {
            console.error(err);
        }
    })
}
