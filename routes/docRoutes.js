const express = require("express");
const {
    createDoc,
    getDoc,
    getDocs,
} = require("../controllers/docController");
const validateToken = require("../middleware/validateTokenHandler");
const { permissionHandler } = require("../middleware/permissionHandler");

const router = express.Router();

router
.post("/create", validateToken, permissionHandler('updateOwn', 'workspace'), createDoc)
.get("/get", validateToken, permissionHandler('readOwn', 'document'), getDocs);

router.get("/get/:id", validateToken, permissionHandler('readOwn', 'document'), getDoc);

module.exports = router;