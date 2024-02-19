function renderFileTableData(res){
     /* large screen */
     const tableBody = $("#fileTable tbody");
     tableBody.empty();

     res.forEach(function (file, index) {
         const formattedDate = new Date(file.created_at).toLocaleDateString("ko-KR", {
             year: "numeric",
             month: "long",
             day: "numeric",
             weekday: "long"
         });

         tableBody.append(`
             <tr>
                 <td>${index + 1 + pageSize * currentPage}</td>
                 <td>
                    <span class="category-name" style="background-color: ${categoryColorMap[file.category]}">${file.category}</span>
                 </td>
                 <td>${file.name}</td>
                 <td>${formattedDate}</td>
                 <td><button class="download-button" data-fileid="${file.id}"></button></td>
             </tr>
         `);
     });

     /* mobile screen */
     const mobileTableBody = $("#mobile-fileTable tbody");
     mobileTableBody.empty();

     res.forEach(function (file, index) {
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
                         <div>
                            <span class="category-name" style="background-color: ${categoryColorMap[file.category]}">${file.category}</span>
                         </div>
                         <div>${file.name}</div>
                         <div>${formattedDate}</div>
                     </div>
                 </td>
                 <td><button class="download-button" data-fileid="${file.id}"></button></td>
             </tr>
         `);
     });
}