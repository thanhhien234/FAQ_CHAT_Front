class Category {
    constructor(){
        this.categoryData = [];
        this.currentCategoryData = [];
        this.colors = ['#E3F1D4','#FFE5E5','#F7F5BA','#E2D7EE','#BADAF7','#FFBCC4','#CDBA9E','#BAF7F4','#FFDB96'];
    }
    async renderCategory() {
        await $.ajax({
            url: config.fileServer + `/api/category/all`,
            type: "GET",
            headers: {
                Authorization: "Bearer " + getCookie("accessToken")
            },
            success: (res) => {
                this.categoryData = res.map((category,index) => {
                    return {
                        color: this.colors[index % this.colors.length],
                        categoryName: category.name,
                        filesNum: category.count
                    };
                });
                this.renderCategorySelect();
            }, 
            error: function (err) {
                alert('파일 조회 중 오류가 발생했습니다.');
            }
        });
    }
    async searchCategory(category) { 
        await $.ajax({
            url: config.fileServer + `/api/file/list?category=${category}`,
            type: "GET",
            headers: {
                Authorization: "Bearer " + getCookie("accessToken")
            },
            success:() => {
                const filteredFiles = this.currentCategoryData.filter(file => file.category === category);
                this.renderFileData(filteredFiles);
            },
            error: function (err) {
                alert('카테고리 조회 중 오류가 발생했습니다.');
            }
        })
    }
    async fileListSearch() {
        await $.ajax({
            url: config.fileServer + `/api/file/all`,
            type: "GET",
            headers: {
                Authorization: "Bearer " + getCookie("accessToken")
            },
            success: (res) => {
                this.currentCategoryData = res.map((file) => {
                    let categoryColor;
                    for (let i = 0; i < this.categoryData.length; i++) {
                        if (this.categoryData[i].categoryName === file.category) {
                            categoryColor = this.categoryData[i].color;
                            break; 
                        }
                    }
                    return {
                        category: file.category,
                        color: categoryColor,
                        fileId: file.id,
                        fileName: file.name,
                        downloadName: file.fileName,
                        date: new Date(file.created_at).toLocaleDateString("ko-KR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            weekday: "long"
                        })
                    };
                });
                this.renderFileData(this.currentCategoryData);
            },
            error: function (err) {
                alert('파일 조회 중 오류가 발생했습니다.');
            }
        });
    }
    renderFileData(data){
        const tableBody = $("#fileTable tbody");
        tableBody.empty();

        data.forEach(function (file, index) {
            tableBody.append(`
                <tr>
                    <td>${index + 1}</td>
                    <td>
                        <span class="category-name" style="background-color: ${file.color}">${file.category}</span>
                    </td>
                    <td>${file.fileName}</td>
                    <td>${file.date}</td>
                    <td><button class="download-button" data-fileid="${file.fileId}"></button></td>
                </tr>
            `);
        }); 

        /* mobile screen */
        const mobileTableBody = $("#mobile-fileTable tbody");
        mobileTableBody.empty();

        data.forEach(function (file, index) {
            mobileTableBody.append(`
                <tr>
                    <td>${index + 1}</td>
                    <td>
                        <div class="file-info">
                            <div>
                                <span class="category-name" style="background-color: ${file.color}">${file.category}</span>
                            </div>
                            <div>${file.fileName}</div>
                            <div>${file.date}</div>
                        </div>
                    </td>
                    <td><button class="download-button" data-fileid="${file.fileId}"></button></td>
                </tr>
            `);
        });
    }
    renderCategorySelect(){
        const categorySelect = document.getElementById('categorySelect');
        categorySelect.innerHTML = '<option value="all" selected>최근 게시된 순으로 보기</option>';
        this.categoryData.forEach(function(category,index) {
            const option = document.createElement('option');
            option.value = category.categoryName; 
            option.textContent = category.categoryName;
            categorySelect.appendChild(option);
        });
    }
}