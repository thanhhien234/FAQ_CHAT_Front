//학생이 챗붓의 답변 가져오기
async function chatToChatbot(question) {
    const questionChatbotContainer = $('<div class="question-wrapper">');
    const questionChatbot = $('<div class="question">').text(question);
    questionChatbotContainer.append(questionChatbot);
    chatbotWrapper.append(questionChatbotContainer);
    const loadingContainer = showLoading();
    chatbotWrapper.append(loadingContainer);

    await $.ajax({
        url: config.chatServer + '/api/chat?question=' + question,
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        headers: {
            Authorization: "Bearer " + getCookie("accessToken")
        },
        success: function (res) {
            loadingContainer.replaceWith(createAnswerContainer(res));
            
            chatbotWrapper.scrollTop(chatbotWrapper[0].scrollHeight); //scroll to bottom
        },
        error: function (err) {
            loadingContainer.remove();
            console.error(err);
            errorMessage();
        }
    })
}
function errorMessage(){
    const errorMessage = "서버 오류입니다. 잠시 후 다시 시도해주세요.";
    const errorContainer = $('<div class="answer-wrapper">');
    const error = $('<div class="answer">').text(errorMessage);
    errorContainer.append(error);
    $('.chatbot-wrapper').append(errorContainer);
}

function showLoading() {
    const loadingContainer = $('<div class="answer-wrapper">');
    const spinner = $('<div class="spinner-border" role="status"></div>');
    const spinnerText = $('<div class="answer">').append(spinner);
    loadingContainer.append(spinnerText)
    return loadingContainer;
}

function createAnswerContainer(answer) {
    const answerChatbotContainer = $('<div class="answer-wrapper">');
    const answerChatbot = $('<div class="answer">').text(answer);
    answerChatbotContainer.append(answerChatbot);
    return answerChatbotContainer;
}