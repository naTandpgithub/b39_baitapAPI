var dataService = new DataService();

function getEle(id) {
  return document.getElementById(id);
}

function getListData() {
  var promise = dataService.getListDataApi();
  /// pending
  getEle("loader").style.display = "block";
  promise
    .then(function (result) {
      console.log(result);
      getEle("loader").style.display = "none";
      renderHTML(result.data);
    })
    .catch(function (error) {
      getEle("loader").style.display = "none";
      console.log(error);
    });
}

getListData();

function renderHTML(data) {
  var content = "";
  data.forEach(function (teacher) {
    if (teacher.loaiND === "HV") {
    }

    content += `
  
    <div class="col-12 col-sm-6 col-lg-3  my-3">
    <div class="card">
      <img class="card-img-top" src="./img/images/${teacher.hinhAnh}" alt="" />
      <div class="card-body">
        <div class="card-title">
          <p>${teacher.ngonNgu}</p>
  
          <h4>${teacher.hoTen}</h4>
        </div>
        <div class="card__text">
          <p>
            ${teacher.moTa}
          </p>
        </div>
      </div>
    </div>
  </div>
  `;
  });
  getEle("teacher").innerHTML = content;
}
