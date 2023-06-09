const asyncHandler = require("express-async-handler");
const Document = require("../models/docModel.js");
const Permission = require("../models/permissionModel.js");
const Workspace = require("../models/workspaceModel.js");

const createDoc = asyncHandler(async (req, res) => {
    console.log(req.body);
    const doc = await Document.create(req.body);
    const workspace = await Workspace.findById(req.body.parentNode);
    workspace.childNodes.push(doc.id);
    await workspace.save();
    const userId = req.user.id;
    const permissionParams = {
        userId: userId,
        resourceId: doc.id,
        role: 'd_admin',
        permissions: {
            resource: 'document',
            operation: ['view', 'edit', 'delete']
        }
    }
    await Permission.create(permissionParams);
    res.send({
        message: "Success",
        data: doc,
    });
});

const getDoc = asyncHandler(async (req, res) => {
    const doc = await Document.findById(req.params.id);
    res.send({
        message: "Success",
        data: doc,
    });
});

const getDocs = asyncHandler(async (req, res) => {
    const permissions = await Permission.find({ userId: req.user.id, 'permissions.resource': 'document' });
    const resourceIds = permissions.map(permission => permission.resourceId);
    console.log(resourceIds);
    const docs = await Document.find({ _id: { $in: resourceIds }});
    res.send({
        message: 'Success',
        data: docs
    })
});

module.exports = {
    createDoc,
    getDoc,
    getDocs,
};
