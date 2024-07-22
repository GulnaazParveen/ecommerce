class ApiFeatures{
    constructor(query,queryStr){
        this.query=query,
        this.queryStr=queryStr
    }

//     search() {
//   if (this.queryStr.keyword) {
//     console.log("Original Query:", this.queryStr.keyword);
//     this.query = this.query.find({
//       $text: { $search: this.queryStr.keyword }
//     });
//     console.log("Search Query:", this.query);
//   }
//   return this;
// }
  search() {
    if (this.queryStr.keyword) {
      console.log("Original Query:", this.queryStr.keyword);
      this.query = this.query.find({
        $text: { $search: this.queryStr.keyword }
      });
      console.log("Search Query:", this.query);
    }
    return this;
  }
  
// filter 
filter() {
  const queryCopy = { ...this.queryStr };
  console.log("Query Copy Before Removing Fields:", queryCopy);
  
  const removeFields = ["keyword", "page", "limit"];
  removeFields.forEach(field => delete queryCopy[field]);
  
  console.log("Query Copy After Removing Fields:", queryCopy);

  for (const key in queryCopy) {
    if (["gt", "gte", "lt", "lte"].includes(key)) {
      queryCopy[key] = { [`$${key}`]: queryCopy[key] };
    }
  }

  console.log("Final Filter Query:", queryCopy);

  this.query = this.query.find(queryCopy);
  return this;
}

// pagination
pagination(resultPerPage) {
  const currentPage = Number(this.queryStr.page) || 1;
  const skip = resultPerPage * (currentPage - 1);

  console.log("Current Page:", currentPage);
  console.log("Documents to Skip:", skip);

  this.query = this.query.limit(resultPerPage).skip(skip);
  console.log("Pagination Query:", this.query);
  return this;
}
y
}
export default  ApiFeatures