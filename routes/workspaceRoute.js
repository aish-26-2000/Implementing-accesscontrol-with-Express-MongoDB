const express = require("express");
const {
    createWorkspace,
    getWorkspaces,
    getWorkspace,
    editWorkspace,
    shareWorkpaceEditorAccess,
    shareWorkpaceViewerAccess
} = require("../controllers/workspaceController");
const validateToken = require("../middleware/validateTokenHandler");
const {permissionHandler} = require("../middleware/permissionHandler");

const router = express.Router();

router
.post("/create", validateToken, createWorkspace)
.get("/get", validateToken,permissionHandler('readOwn','workspace'), getWorkspaces);

router.get("/get/:id", validateToken,permissionHandler('readOwn','workspace') ,getWorkspace);

router.patch("/edit/:id", validateToken, permissionHandler('editOwn','workspace'), editWorkspace);

// router.post("/share/edit/:id", validateToken,permissionHandler('editOwn','workspace'), shareWorkpaceEditorAccess);

// router.post("/share/view/:id", validateToken,roleHandler('workspace', 'owner'), shareWorkpaceViewerAccess);


module.exports = router;
