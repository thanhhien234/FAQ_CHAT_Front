let currentPage = 0;
let pageSize = 10;

async function fileListSearch(page, pageSize) {
    await $.ajax({
        url: config.fileServer + `/api/file/list?page=${page}&pageSize=${pageSize}`,
        type: "GET",
        headers: {
            Authorization: "Bearer " + getCookie("accessToken")
        },
        success: function (res) {
            console.log('file:',res);
            const totalPages = Math.ceil(res.fileCount / pageSize);

            /* large screen */
            const tableBody = $("#fileTable tbody");
            tableBody.empty();

            res.fileGetListElementResList.forEach(function (file, index) {
                const formattedDate = new Date(file.created_at).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    weekday: "long"
                });

                tableBody.append(`
                    <tr>
                        <td>${index + 1 + pageSize * currentPage}</td>
                        <td>${file.name}</td>
                        <td>${formattedDate}</td>
                        <td><button class="download-button" data-fileId="${file.id}"></button></td>
                    </tr>
                `);
            });

            /* mobile screen */
            const mobileTableBody = $("#mobile-fileTable tbody");
            mobileTableBody.empty();

            res.fileGetListElementResList.forEach(function (file, index) {
                const formattedDate = new Date(file.created_at).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    weekday: "long"
                });

                mobileTableBody.append(`
                    <tr>
                        <td>${index + 1 + pageSize * currentPage}</td>
                        <td>
                            <div class="file-info">
                                <div>${file.name}</div>
                                <div>${formattedDate}</div>
                            </div>
                        </td>
                        <td><button class="download-button" data-fileId="${file.id}"></button></td>
                    </tr>
                `);
            });

            /* Add empty rows */
            let emptyRow = pageSize - res.fileGetListElementResList.length;
            for (let i = 0; i < emptyRow; i++) {
                tableBody.append(`<tr><td></td><td></td><td></td><td></td></tr>`);
                mobileTableBody.append(`<tr><td></td><td></td><td></td></tr>`);
            }

            addPaging(totalPages); // Paging
            currentPageButton(); // Underline pageButton's text
        },
        error: function (err) {
            console.error(err);
        }
    });
}


function addPaging(totalPages) {
    $(".myPaging, .myMobilePaging").remove();

    const paging = $("<div class='myPaging'></div>");
    const mobilePaging = $("<div class='myMobilePaging'></div>");

    for (let i = 0; i < totalPages; i++) {
        paging.append(`<button class="pageButton" data-page="${i}">${i + 1}</button>`);
        mobilePaging.append(`<button class="mobilePageButton" data-page="${i}">${i + 1}</button>`);
    }

    paging.on("click", ".pageButton", function () {
        const newPage = parseInt($(this).data("page"));
        if (newPage !== currentPage) {
            currentPage = newPage;
            fileListSearch(currentPage, pageSize);
        }
    });

    mobilePaging.on("click", ".mobilePageButton", function () {
        const newPage = parseInt($(this).data("page"));
        if (newPage !== currentPage) {
            currentPage = newPage;
            fileListSearch(currentPage, pageSize);
        }
    });

    $("#fileTable").after(paging);
    $("#mobile-fileTable").after(mobilePaging);
}

function currentPageButton() {
    $(".pageButton").removeClass("current");
    $(`.pageButton[data-page="${currentPage}"]`).addClass("current");
    $(".mobilePageButton").removeClass("current");
    $(`.mobilePageButton[data-page="${currentPage}"]`).addClass("current");
}

fileListSearch(currentPage,pageSize); 
