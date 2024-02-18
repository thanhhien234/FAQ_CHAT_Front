const toggleBtn = $(".aside-toggle");
const sideBar = $("aside");
const menuList = $(".aside-menus > li");
let activeList = $(".aside-menus > .active");
let mobileActiveList = $(".mobile-menus > .active");
const listRightContent = $("li > .aside-menus-item-right");
const chatbotWrapper = $(".chatbot-wrapper");
const instructorWrapper = $(".instructor-wrapper");
const fileContainer = $(".file-container");
const blindWrapper = $(".chat-blind-wrapper")
const inputChatWrapper = $(".input-chat-wrapper")


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
            chatbotWrapper.show();
            chatbotWrapper.scrollTop(chatbotWrapper[0].scrollHeight); //scroll to bottom
            blindWrapper.show();
            instructorWrapper.hide();
            inputChatWrapper.show();
            fileContainer.hide();
            break;
        case "instructor-menu":
            $("#instructor-menu img").attr("src", "/public/assets/icon/Person.png");
            $("#mobile-instructor-menu img").attr("src", "/public/assets/icon/Person.png");
            $("#mobile-instructor-menu").addClass("active");
            instructorWrapper.show();
            instructorWrapper.scrollTop(instructorWrapper[0].scrollHeight); //scroll to bottom
            blindWrapper.show();
            inputChatWrapper.show();
            chatbotWrapper.hide();
            fileContainer.hide();
            break;
        case "files-menu":
            $("#files-menu img").attr("src", "/public/assets/icon/file_selected_icon.png");
            $("#mobile-files-menu img").attr("src", "/public/assets/icon/file_selected_icon.png");
            $("#mobile-files-menu").addClass("active");
            chatbotWrapper.hide();
            instructorWrapper.hide();
            blindWrapper.hide();
            inputChatWrapper.hide();
            fileContainer.show();
            $("#categorySelect").val("all");
            $("#categorySelect").change();
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
            $("#categorySelect").val("all");
            $("#categorySelect").change();
            break;
    }
    mobileActiveList = $(".mobile-menus > .active");
})


