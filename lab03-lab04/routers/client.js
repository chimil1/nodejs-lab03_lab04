const express = require("express");
const router = express();


const homeController = require("../controller/home");

router.get("/", homeController.index);

router.get("/qlproduct", homeController.qlproduct);

router.get('/delete/:id', homeController.delete);

router.get("/single/:id",homeController.single)

router.get('/addproduct', homeController.addProduct);

router.post('/addproduct', homeController.post);

router.get('/editProduct/:id', homeController.editProduct);

router.post('/editProduct/:id', homeController.updateProduct);


module.exports = router;
