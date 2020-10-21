const express = require('express');
const { readData, readAllData } = require('../controllers/get');
const { createData } = require('../controllers/post');
const { updateData } = require('../controllers/put');
const { deleteData } = require('../controllers/delete');
const validator = require('../validators/chartValidator');


//   Get access to the router
const router = express.Router();


//   Give responsibility to the controller to handle GET requests
//
//   so this acts as the middleware
//      router.get("/getbengals", readBengalGroup);
//      router.get("/nfl", readNFLGroup);
//
console.log("inside request.js");
router.get("/:resource", readData);
router.get("/:resource/:id", readData);


//   Give responsibility to the controller to handle POST requests
//
//   Validate before creating a POST
//      router.post("/post", validator.createPostValidator, createPostGroup);
//      router.post("/postbengals", validator.createPostValidator, createBengalGroup);
//
router.post("/:resource", validator.modelValidator, createData);


//   Give responsibility to the controller to handle PUT requests
router.put("/:resource/:id", validator.modelValidator, updateData);


//   Give responsibility to the controller to handle DELETE requests
router.delete("/:resource/:id", deleteData);


module.exports = { router };