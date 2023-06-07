const express = require("express");
const {
    createWorkspace,
    getWorkspace,
    editWorkspace,
    shareWorkpaceEditorAccess,
    shareWorkpaceViewerAccess
} = require("../controllers/workspaceController");
const validateToken = require("../middleware/validateTokenHandler");
const {permissionHandler, roleHandler} = require("../middleware/permissionHandler");

const router = express.Router();

router.post("/create", validateToken, createWorkspace);

router.get("/get/:id", validateToken,permissionHandler('workspace','view') ,getWorkspace);

router.patch("/edit/:id", validateToken, permissionHandler('workspace','edit'), editWorkspace);

router.post("/share/edit/:id", validateToken,roleHandler('workspace', 'owner'), shareWorkpaceEditorAccess);

router.post("/share/view/:id", validateToken,roleHandler('workspace', 'owner'), shareWorkpaceViewerAccess);


module.exports = router;
