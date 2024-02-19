$(document).ready(function() {
    function moveCategorySelect() {
        if ($(window).width() < 900) { // Create gap between thead and tbody of mobile-fileTable
            var categorySelectWrapper = $('.category-select-wrapper').detach();
            $('#mobile-fileTable').find('thead').after('<div class="gap"></div>', categorySelectWrapper);
        } else {  // back to original position
            $('.category-select-wrapper').insertBefore('.file-wrapper');
        }
    }
    moveCategorySelect();
    $(window).resize(function() {
        moveCategorySelect();
    });
});
