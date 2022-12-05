var dataService = new DataService();
function getEle(id) {
  return document.getElementById(id);
}

var vadilation = new Validation();

function resetForm() {
  getEle("formData").reset();
}

var isEdit = false;
// lay danh sach

function getListData() {
  dataService
    .getListDataApi()

    .then(function (rs) {
      // console.log(rs.data);
      renderHTML(rs.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

getListData();

function renderHTML(data) {
  var content = "";
  data.forEach(function (teacher, index) {
    content += `
    <tr>
            <td>${index + 1}</td>
            <td>${teacher.taiKhoan}</td>
            <td>${teacher.matKhau}</td>
            <td>${teacher.hoTen}</td>
            <td>${teacher.email}</td>
            <td>${teacher.ngonNgu}</td>
            <td>${teacher.loaiND}</td>
            <td>
                <button    class="btn btn-warning"  data-toggle="modal"
                data-target="#myModal"  onclick="editData('${teacher.id}')" >
                Edit
                </button>
                <button    class="btn btn-danger"   onclick="deleteData('${
                  teacher.id
                }')">
                Delete
                </button>




            </td>

    
    
    
    
    
    
    </tr>
    
    
    
    `;
  });

  getEle("tblDanhSachNguoiDung").innerHTML = content;
}

//deletedata

function deleteData(id) {
  dataService
    .deleteDataApi(id)
    .then(function (result) {
      console.log(result);
      getListData();
    })
    .catch(function (error) {
      console.log(error);
    });
}

////Edit nút thêm
getEle("btnThemNguoiDung").onclick = function () {
  resetForm();
  getEle("TaiKhoan").disabled = false;
  var title = "Thêm mới ";
  document.getElementsByClassName("modal-title")[0].innerHTML = title;
  var button = ` <button class="btn btn-success"  onclick="addData()"> Thêm</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = button;
};

//// Add Data
function addData() {
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;

  var hinhAnh = getEle("HinhAnh").value;

  var loaiND = getEle("loaiNguoiDung").value;
  var ngonNgu = getEle("loaiNgonNgu").value;
  var moTa = getEle("MoTa").value;

  /////  check Validation
  var isValid = true;

  //TK

  isValid &= vadilation.kiemTraRong(
    taiKhoan,
    "errorTK",
    "(*)Vui lòng nhập Tài khoản"
  );

  //HọTen
  isValid &=
    vadilation.kiemTraRong(hoTen, "errorHoTen", "(*)Vui lòng nhập Tên") &&
    vadilation.kiemTraChuoiKyTu(
      hoTen,
      "errorHoTen",
      "(*)Vui lòng nhập đúng tên"
    );
  //mat khau
  isValid &=
    vadilation.kiemTraRong(
      matKhau,
      "errorMatKhau",
      "(*)Vui lòng nhập Mật khẩu"
    ) &&
    vadilation.kiemTraMatKhau(
      matKhau,
      "errorMatKhau",
      "(*)Vui lòng nhập có 1 ký tự in hoa, 1 ký tự đặt biệt , 1 số"
    );
  //email
  isValid &=
    vadilation.kiemTraRong(email, "errorEmail", "(*)Vui lòng nhập Email") &&
    vadilation.kiemTraEmail(
      email,
      "errorEmail",
      "(*)Vui lòng nhập đúng định dạng email"
    );
  //hinh anh
  isValid &= vadilation.kiemTraRong(
    hinhAnh,
    "errorHinhAnh",
    "(*)Vui lòng nhập Hình Ảnh"
  );
  // loại nguoi dung
  isValid &= vadilation.kiemTraChon(
    "loaiNguoiDung",
    "errorND",
    "(*)Vui lòng chọn"
  );
  //loại ngon ngu
  isValid &= vadilation.kiemTraChon(
    "loaiNgonNgu",
    "errorLoaiND",
    "(*)Vui lòng nhập Chọn Ngôn Ngữ"
  );
  // mo ta
  isValid &=
    vadilation.kiemTraRong(moTa, "errorMota", "(*)Vui lòng nhập Mô tả") &&
    vadilation.kiemTraDoDaiKyTu(
      moTa,
      "errorMota",
      "(*)Vui lòng nhập không quá 60 ký tự"
    );

  if (!isValid) return;

  var data = new Data(
    "",
    taiKhoan,
    hoTen,
    matKhau,
    email,
    hinhAnh,
    loaiND,
    ngonNgu,
    moTa
  );
  console.log(data);
  dataService
    .addDataApi(data)
    .then(function (result) {
      console.log(result);
      getListData();
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}

////Edit nút Sửa
function editData(id) {
  var isEdit = true;
  var title = "Thông tin  ";
  document.getElementsByClassName("modal-title")[0].innerHTML = title;
  var button = ` <button class="btn btn-success"  onclick="updateData(${id})"> Sửa</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = button;
  console.log(id);
  dataService
    .getDataByIDApi(id)
    .then(function (result) {
      var data = result.data;
      getEle("TaiKhoan").value = data.taiKhoan;
      if ((isEdit = true)) {
        getEle("TaiKhoan").disabled = true;
      }
      getEle("HoTen").value = data.hoTen;
      getEle("MatKhau").value = data.matKhau;
      getEle("Email").value = data.email;

      getEle("HinhAnh").value = data.hinhAnh;

      getEle("loaiNguoiDung").value = data.loaiND;
      getEle("loaiNgonNgu").value = data.ngonNgu;
      getEle("MoTa").value = data.moTa;
    })
    .catch(function (error) {
      console.log(error);
    });
}

////update data
function updateData(id) {
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;

  var hinhAnh = getEle("HinhAnh").value;

  var loaiND = getEle("loaiNguoiDung").value;
  var ngonNgu = getEle("loaiNgonNgu").value;
  var moTa = getEle("MoTa").value;
  var data = new Data(
    id,
    taiKhoan,
    matKhau,
    email,
    hinhAnh,
    loaiND,
    ngonNgu,
    moTa
  );
  dataService
    .updateDataApi(data)
    .then((result) => {
      alert("update success");
      getListData();
      document.getElementsByClassName("close")[0].click();
    })
    .catch((error) => {
      console.log(error);
    });
}
