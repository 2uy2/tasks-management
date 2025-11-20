module.exports =(objectPagination,query,countRecord) => {
    if (query.page){
        objectPagination.currentPage= parseInt(query.page )//so sánh current page với lại param
                                                    // chuyển qua dạng int cho đúng dữ liệu
    }  
    if (query.limit){
        objectPagination.limitItems=parseInt(query.limit)
    }
    objectPagination.skip = (objectPagination.currentPage-1)*objectPagination.limitItems;
    // console.log(objectPagination.skip)
    const totalPage = Math.ceil(countRecord/objectPagination.limitItems);// làm tròn số trang 
    objectPagination.totalPage= totalPage;
    return objectPagination;
}