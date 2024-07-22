var db = require("../models/database");
const multer = require("multer");
const path = require("path");
// Cấu hình Multer để lưu tệp tin
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images"); // Đường dẫn lưu tệp tin
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Đổi tên tệp tin
  },
});
const upload = multer({ storage: storage });

exports.index = async (req, res, next) => {
  res.render("client/home");
};

exports.qlproduct = async (req, res, next) => {
  let sql = "SELECT * FROM product";
  db.query(sql, function (err, data) {
    data.forEach((data) => {
      data.price = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(data.price);
    });
    if (err) throw err;
    res.render("client/product/qlProduct", { data: data });
  });
};

exports.delete = async (req, res, next) => {
  const id = req.params.id;
  const sql = "DELETE FROM product WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.redirect("/qlproduct");
  });
};

exports.single = async (req, res, next) => {
  id = req.params.id;
  let sql = `SELECT * FROM product WHERE id = ?`;
  db.query(sql, [id], function (err, data) {
    data.forEach((data) => {
      data.price = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(data.price);
    });
    if (err) throw err;
    res.render("client/product/single", { category: data[0] });
  });
};

exports.addProduct = async (req, res, next) => {
  res.render("client/product/addProduct");
};
exports.post = [
  upload.single("image"),
  async (req, res, next) => {
    const { name, price, dess } = req.body;
    const image = req.file ? req.file.filename : ""; // Lấy tên tệp tin đã lưu
    const sql =
      "INSERT INTO product (name, price, dess, image) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, price, dess, image], (err, result) => {
      if (err) throw err;
      res.redirect("/qlproduct"); // Điều hướng sau khi thêm thành công
    });
  },
];

exports.editProduct = async (req, res, next) => {
  const id = req.params.id;
  const sql = "SELECT * FROM product WHERE id = ?";
  db.query(sql, [id], (err, data) => {
    if (err) throw err;
    res.render("client/product/edit", { product: data[0] });
  });
};

// Xử lý dữ liệu chỉnh sửa sản phẩm
exports.updateProduct = [
  upload.single("image"),
  async (req, res, next) => {
    const id = req.params.id;
    const { name, price, dess } = req.body;
    const image = req.file ? req.file.filename : req.body.existingImage; // Lấy tên tệp tin mới hoặc giữ nguyên tệp tin cũ
    const sql =
      "UPDATE product SET name = ?, price = ?, dess = ?, image = ? WHERE id = ?";
    db.query(sql, [name, price, dess, image, id], (err, result) => {
      if (err) throw err;
      res.redirect("/qlproduct"); // Điều hướng sau khi cập nhật thành công
    });
  },
];
