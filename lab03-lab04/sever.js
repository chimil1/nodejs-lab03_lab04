const express = require("express");
var bodyParser = require("body-parser");
const multer = require("multer");
const app = express();
const port = 3000;

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage });

app.use(express.static("public"));
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.set("view engine", "ejs");
app.set("views", "./views");

const Routerclient = require("./routers/client");
app.use("/", Routerclient);

app.listen(port, () => {
  console.log(`Ung dung dang chay voi port: ${port}`);
});
