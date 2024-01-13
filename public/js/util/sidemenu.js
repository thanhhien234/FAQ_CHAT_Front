const toggleBtn = $(".aside-toggle");
const sideBar = $("aside");
const menuList = $(".aside-menus > li");
let activeList = $(".aside-menus > .active");
const listRightContent = $("li > .aside-menus-item-right");
const chatbotContainer = $(".chatbot-message-container");
const instructorContainer = $(".instructor-message-container");
const fileContainer = $(".file-container");
const blindContainer = $(".chat-blind-container")
const inputChatContainer = $(".input-chat-container")

toggleBtn.on("click", function () {
    if (sideBar.hasClass('close')) {
        sideBar.removeClass('close');
        setTimeout(function () {
            listRightContent.css("display", "flex");
        }, 500);
    } else {
        sideBar.addClass('close');
        listRightContent.css("display", "none");
    }
})

menuList.on("click", function (e) {
    activeList.removeClass("active");
    switch (activeList.attr("id")) {
        case "chatbot-menu":
            $("#chatbot-menu img").attr("src", "../public/assets/icon/Message_white.png");
            fileContainer.hide();
            break;
        case "instructor-menu":
            $("#instructor-menu img").attr("src", "../public/assets/icon/Person_white.png");
            fileContainer.hide();
            break;
        case "files-menu":
            $("#files-menu img").attr("src", "../public/assets/icon/file_icon.png");
            fileContainer.hide();
            break;
    }
    $(e.currentTarget).addClass("active");
    switch ($(e.currentTarget).attr("id")) {
        case "chatbot-menu":
            $("#chatbot-menu img").attr("src", "../public/assets/icon/Message.png");
            chatbotContainer.show();
            blindContainer.show();
            instructorContainer.hide();
            inputChatContainer.show();
            fileContainer.hide();
            break;
        case "instructor-menu":
            $("#instructor-menu img").attr("src", "../public/assets/icon/Person.png");
            instructorContainer.show();
            blindContainer.show();
            inputChatContainer.show();
            chatbotContainer.hide();
            fileContainer.hide();
            break;
        case "files-menu":
            $("#files-menu img").attr("src", "../public/assets/icon/file_selected_icon.png");
            chatbotContainer.hide();
            instructorContainer.hide();
            blindContainer.hide();
            inputChatContainer.hide();
            fileContainer.show();
            break;
    }
    activeList = $(".aside-menus > .active");
})

$("#chatbot-menu").trigger("click"); //initially