async function fileListSearch(page, pageSize) {   //search all files
    await $.ajax({
        url: config.fileServer + `/api/file/all?page=${page}&pageSize=${pageSize}`,
        type: "GET",
        headers: {
            Authorization: "Bearer " + getCookie("accessToken")
        },
        success: function (res) {
            resData = res
            renderFileTableData(res)
        },
        error: function (err) {
            alert('파일 조회 중 오류가 발생했습니다.');
        }
    })
}