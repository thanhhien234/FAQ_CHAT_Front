let totalFiles = 0;
const categoryColorMap = {};
const categoryAllData = {};

function getCategoryColor(index) {
    const colors = ['#E3F1D4','#FFE5E5','#F7F5BA','#E2D7EE','#BADAF7','#FFBCC4','#CDBA9E','#BAF7F4','#FFDB96'];
    return colors[index % colors.length];
}
function renderCategorySelect(res){
    const categorySelect = document.getElementById('categorySelect');
    categorySelect.innerHTML = '<option value="all" selected>최근 게시된 순으로 보기</option>';
    res.forEach(function(category,index) {
        categoryAllData[category.name] = category.count;
        totalFiles += category.count;
        const option = document.createElement('option');
        option.value = category.name; 
        option.textContent = category.name;
        categorySelect.appendChild(option);

        // Assign color for each category 
        if (category.count !== 0) {
            const color = getCategoryColor(index);
            categoryColorMap[category.name] = color;
        }
    });
}
async function categoryAllSearch() {
    await $.ajax({
        url: config.fileServer + `/api/category/all`,
        type: "GET",
        headers: {
            Authorization: "Bearer " + getCookie("accessToken")
        },
        success: function (res) {
            renderFileTableData(res);  //into main screen select
            renderCategorySelect(res);  //into category select
        }, 
        error: function (err) {
            alert('파일 조회 중 오류가 발생했습니다.');
        }
    });
}

