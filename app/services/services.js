function DataService() {
  this.getListDataApi = function () {
    return axios({
      url: "https://6385f954875ca3273d4c01fb.mockapi.io/api/data",
      method: "GET",
    });
  };

  this.deleteDataApi = function (id) {
    return axios({
      url: `https://6385f954875ca3273d4c01fb.mockapi.io/api/data/${id}`,
      method: "DELETE",
    });
  };

  this.addDataApi = function (data) {
    return axios({
      url: "https://6385f954875ca3273d4c01fb.mockapi.io/api/data",
      method: "POST",
      data: data,
    });
  };

  this.getDataByIDApi = function (id) {
    console.log("run here");
    console.log("id==========", id);
    return axios({
      url: `https://6385f954875ca3273d4c01fb.mockapi.io/api/data/${id}`,
      method: "GET",
    });
  };

  this.updateDataApi = function (data) {
    return axios({
      url: `https://6385f954875ca3273d4c01fb.mockapi.io/api/data/${data.id}`,
      method: "PUT",
      data: data,
    });
  };
}
