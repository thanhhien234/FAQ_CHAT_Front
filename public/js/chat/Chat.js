class Chat {
    constructor(){
        this.chatToInstructorContent = [];
        this.isChatbotResponse = false;
    }
    async chatToChatbot(question) {
        const questionChatbotContainer = $('<div class="question-wrapper">');
        const questionChatbot = $('<div class="question">').text(question);
        questionChatbotContainer.append(questionChatbot);
        chatbotWrapper.append(questionChatbotContainer);
        const loadingContainer = $('<div class="answer-wrapper">');
        const spinner = $('<div class="spinner-border" role="status"></div>');
        const spinnerText = $('<div class="answer">').append(spinner);
        loadingContainer.append(spinnerText)
        chatbotWrapper.append(loadingContainer);
        chatbotWrapper.scrollTop(chatbotWrapper[0].scrollHeight);
    
        await $.ajax({
            url: config.chatServer + '/api/chat?question=' + question,
            type: "GET",
            contentType: 'application/json; charset=utf-8',
            headers: {
                Authorization: "Bearer " + getCookie("accessToken")
            },
            success: function (res) {
                loadingContainer.remove();
                const answerChatbotContainer = $('<div class="answer-wrapper">');
                const answerChatbot = $('<div class="answer">').text(res);
                answerChatbotContainer.append(answerChatbot);
                $('.chatbot-wrapper').append(answerChatbotContainer);
                chatbotWrapper.scrollTop(chatbotWrapper[0].scrollHeight); //scroll to bottom
            },
            error: function (err) {
                loadingContainer.remove();
                const errorMessage = "서버 오류입니다. 잠시 후 다시 시도해주세요.";
                const errorContainer = $('<div class="answer-wrapper">');
                const error = $('<div class="answer">').text(errorMessage);
                errorContainer.append(error);
                $('.chatbot-wrapper').append(errorContainer);
            }
        })
    } 
    greeting() {
        const greetingMessage = "안녕하세요! 궁금한 것이 있으신가요?<br>아래 입력창에 질문해주세요.";
        const greetingContainer = $('<div class="answer-wrapper">');
        const greeting = $('<div class="answer">').html(greetingMessage);
        greetingContainer.append(greeting);
        $('.chatbot-wrapper').append(greetingContainer);
    }
    async chatToInstructor(comment) {
        await $.ajax({
            url: config.chatServer + "/api/student",
            type: "POST",
            contentType: 'application/json; charset=utf-8',
            headers: {
                Authorization: "Bearer " + getCookie("accessToken")
            },
            data: JSON.stringify({
                "comment": comment
            }),
    
            success: () => {
                this.renderChat();
            },
            error: function (err) {
                alert("서버 오류입니다. 잠시 후 다시 시도해주세요.");
            }
        })
    }
    async renderChat() {
        await $.ajax({
            url: config.chatServer + `/api/student`,
            type: 'GET',
            headers: {
                Authorization: "Bearer " + getCookie("accessToken")
            },
            success: function (res) {
                this.chatToInstructorContent = res.profStdGetElementResList;
                const container = $('.instructor-wrapper');
                container.empty()
                let lastDate = null;
                let latestQuestionTime = null;
                let latestAnswerTime = null;
    
                this.chatToInstructorContent.forEach((element, index, array) => {
                    const formattedDate = new Date(element.time).toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        weekday: "long"
                    });
    
                    const hours = new Date(element.time).getHours();
                    const minutes = new Date(element.time).getMinutes();
                    const period = hours >= 12 ? "오후" : "오전";
                    const formattedTime = period + " " + (hours % 12 || 12) + ":" + (minutes < 10 ? "0" : "") + minutes;
    
                    // If the current date is different from the last date, show only the last date once
                    if (formattedDate !== lastDate) {
                        const dateElement = $('<div>').addClass('date').text(formattedDate);
                        container.append(dateElement);
                        lastDate = formattedDate;
                        latestQuestionTime = null;
                        latestAnswerTime = null;
                    }
    
                    if (element.isQuestion) {
                        const questionContainer = $('<div>').addClass('question-wrapper');
                        const questionElement = $('<div>').addClass('question').text(element.comment);
                        container.append(questionContainer.append(questionElement));
    
                        // if the next element is an answer, add question-time-wrapper
                        const nextElement = array[index + 1];
                        if (nextElement && !nextElement.isQuestion) {
                            const questionTimeContainer = $('<div>').addClass('question-time-wrapper');
                            const questionTimeElement = $('<div>').addClass('time').text(formattedTime);
                            container.append(questionTimeContainer.append(questionTimeElement));
                        }
                        latestQuestionTime = formattedTime; 
                    } else {
                        const answerContainer = $('<div>').addClass('answer-wrapper');
                        const answerElement = $('<div>').addClass('answer').text(element.comment);
                        container.append(answerContainer.append(answerElement));
    
                        // if the next element is a question, add answer-time-wrapper
                        const nextElement = array[index + 1];
                        if (nextElement && nextElement.isQuestion) {
                            const answerTimeContainer = $('<div>').addClass('answer-time-wrapper');
                            const answerTimeElement = $('<div>').addClass('time').text(formattedTime);
                            container.append(answerTimeContainer.append(answerTimeElement));
                        }
                        latestAnswerTime = formattedTime;
                    }
                });
    
                // Always show time for last element
                if (this.chatToInstructorContent.length > 0 && this.chatToInstructorContent[this.chatToInstructorContent.length - 1].isQuestion) {
                    const lastQuestionTimeContainer = $('<div>').addClass('question-time-wrapper');
                    const lastQuestionTimeElement = $('<div>').addClass('time').text(latestQuestionTime);
                    container.append(lastQuestionTimeContainer.append(lastQuestionTimeElement));
                }
                if (this.chatToInstructorContent.length > 0 && !this.chatToInstructorContent[this.chatToInstructorContent.length - 1].isQuestion) {
                    const lastAnswerTimeContainer = $('<div>').addClass('answer-time-wrapper');
                    const lastAnswerTimeElement = $('<div>').addClass('time').text(latestAnswerTime);
                    container.append(lastAnswerTimeContainer.append(lastAnswerTimeElement));
                }
                container.scrollTop(container[0].scrollHeight); //scroll to bottom
            },
            error: function (err) {
                alert('서버 오류입니다. 잠시 후 다시 시도해주세요.');
            }
        });
    }
    sendMessage() {
        var message = $("#messageInput").val();
        if (message.trim() !== "") {
            if (message.length > 500) {
                alert("질문은 500자를 초과할 수 없습니다.");
                return;
            }
            if ($(".chatbot-wrapper").is(":visible")) {
                if (!this.isChatbotResponse) {
                    $("#messageInput").prop("disabled", true);
                    $("#submit").prop("disabled", true);
                    this.isChatbotResponse = true;
    
                    this.chatToChatbot(message).finally(() => {
                        $("#messageInput").prop("disabled", false);
                        $("#submit").prop("disabled", false);
                        this.isChatbotResponse = false;
                        $("#messageInput").focus();
                    }); 
                }       
            } else if ($(".instructor-wrapper").is(":visible")) {
                $("#messageInput").prop("disabled", true);
                $("#submit").prop("disabled", true);
                this.chatToInstructor(message).finally(() => {
                    $("#messageInput").prop("disabled", false);
                    $("#messageInput").focus();
                    $("#submit").prop("disabled", false);
                })
            }
        }
    }  
}