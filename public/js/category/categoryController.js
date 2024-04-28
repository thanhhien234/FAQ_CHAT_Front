const category = new Category();

$("#categorySelect").on("change", function() {
    let selectedOption = this.options[this.selectedIndex];
    let categoryName = selectedOption.value;
    if (categoryName === "all") {
      category.fileListSearch();
    } else {
      category.searchCategory(categoryName);
    }
});

$(window).resize(function() {
    if ($(window).width() < 900) { 
        let categorySelectWrapper = $('.category-select-wrapper').detach();
        $('#mobile-fileTable').find('thead').after('<div class="gap"></div>', categorySelectWrapper);
    } else {
        $('.category-select-wrapper').insertBefore('.file-wrapper');
    }
});