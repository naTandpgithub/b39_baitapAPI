// function DataService() {
//   this.getListDataApi = function () {
//     var promise = axios({
//       url: "https://6385f93ebeaa6458266eedd6.mockapi.io/api/Data",
//       method: "GET",
//     });

//     return promise;
//   };
// }

function DataService() {
  this.getListDataApi = function () {
    var promise = axios({
      url: "https://6385f954875ca3273d4c01fb.mockapi.io/api/data",
      method: "GET",
    });
    return promise;
  };
}
