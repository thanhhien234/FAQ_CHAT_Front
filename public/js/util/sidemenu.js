const toggleBtn = $(".aside-toggle");
const sideBar = $("aside");
const menuList = $(".aside-menus > li");
let activeList = $(".aside-menus > .active");
let mobileActiveList = $(".mobile-menus > .active");
const listRightContent = $("li > .aside-menus-item-right");
const chatbotContainer = $(".chatbot-message-container");
const instructorContainer = $(".instructor-message-container");
const fileContainer = $(".file-wrap");
const blindContainer = $(".chat-blind-container")
const inputChatContainer = $(".input-chat-container")


// Mobile Menus
const mobileMenuList = $(".mobile-menus > li");

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
    mobileActiveList.removeClass("active");
    switch (activeList.attr("id")) {
        case "chatbot-menu":
            $("#chatbot-menu img").attr("src", "/public/assets/icon/Message_white.png");
            $("#mobile-chatbot-menu img").attr("src", "/public/assets/icon/Message_white.png");
            break;
        case "instructor-menu":
            $("#instructor-menu img").attr("src", "/public/assets/icon/Person_white.png");
            $("#mobile-instructor-menu img").attr("src", "/public/assets/icon/Person_white.png");
            break;
        case "files-menu":
            $("#files-menu img").attr("src", "/public/assets/icon/file_icon.png");
            $("#mobile-files-menu img").attr("src", "/public/assets/icon/file_icon.png");
            break;
    }
    $(e.currentTarget).addClass("active");
    switch ($(e.currentTarget).attr("id")) {
        case "chatbot-menu":
            $("#chatbot-menu img").attr("src", "/public/assets/icon/Message.png");
            $("#mobile-chatbot-menu img").attr("src", "/public/assets/icon/Message.png");
            $("#mobile-chatbot-menu").addClass("active");
            chatbotContainer.show();
            blindContainer.show();
            instructorContainer.hide();
            inputChatContainer.show();
            fileContainer.hide();
            break;
        case "instructor-menu":
            $("#instructor-menu img").attr("src", "/public/assets/icon/Person.png");
            $("#mobile-instructor-menu img").attr("src", "/public/assets/icon/Person.png");
            $("#mobile-instructor-menu").addClass("active");
            instructorContainer.show();
            blindContainer.show();
            inputChatContainer.show();
            chatbotContainer.hide();
            fileContainer.hide();
            break;
        case "files-menu":
            $("#files-menu img").attr("src", "/public/assets/icon/file_selected_icon.png");
            $("#mobile-files-menu img").attr("src", "/public/assets/icon/file_selected_icon.png");
            $("#mobile-files-menu").addClass("active");
            chatbotContainer.hide();
            instructorContainer.hide();
            blindContainer.hide();
            inputChatContainer.hide();
            fileContainer.show();
            break;
    }
    activeList = $(".aside-menus > .active");
    mobileActiveList = $(".mobile-menus > .active");
})

$("#chatbot-menu").trigger("click"); //initially

mobileMenuList.on("click", function (e) {
    mobileActiveList.removeClass("active");
    switch (activeList.attr("id")) {
        case "mobile-chatbot-menu":
            $("#mobile-chatbot-menu img").attr("src", "/public/assets/icon/Message_white.png");
            break;
        case "mobile-instructor-menu":
            $("#mobile-instructor-menu img").attr("src", "/public/assets/icon/Person_white.png");
            break;
        case "mobile-files-menu":
            $("#mobile-files-menu img").attr("src", "/public/assets/icon/file_icon.png");
            break;
    }
    $(e.currentTarget).addClass("active");
    switch ($(e.currentTarget).attr("id")) {
        case "mobile-chatbot-menu":
            $("#mobile-chatbot-menu img").attr("src", "/public/assets/icon/Message.png");
            $("#chatbot-menu").click();
            break;
        case "mobile-instructor-menu":
            $("#mobile-instructor-menu img").attr("src", "/public/assets/icon/Person.png");
            $("#instructor-menu").click();
            break;
        case "mobile-files-menu":
            $("#mobile-files-menu img").attr("src", "/public/assets/icon/file_selected_icon.png");
            $("#files-menu").click();
            break;
    }
    mobileActiveList = $(".mobile-menus > .active");
})


