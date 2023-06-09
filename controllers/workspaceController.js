const asyncHandler = require("express-async-handler");
const Workspace = require('../models/workspaceModel');
const Permission = require('../models/permissionModel');
const { isActiveUser } = require("./userController");

const createWorkspace = asyncHandler(async (req, res) => {
    const workspace = await Workspace.create(req.body)
    const userId = req.user.id;
    const permissionParams = {
        userId: userId,
        resourceId: workspace.id,
        role: 'admin',
        permissions: {
            resource: 'workspace',
            operation: ['view', 'edit', 'delete']
        }
    }
    await Permission.create(permissionParams);
    res.send(workspace)
});

const getWorkspaces = asyncHandler(async (req, res) => {
    const permissions = await Permission.find({ userId: req.user.id, 'permissions.resource': 'workspace' });
    const resourceIds = permissions.map(permission => permission.resourceId);
    console.log(resourceIds);
    const workspaces = await Workspace.find({ _id: { $in: resourceIds }});
    res.send({
        message: 'Success',
        data: workspaces
    })
});

const getWorkspace = asyncHandler(async (req, res) => {
    const workspace = await Workspace.findById(req.params.id);
    res.send({
        message: 'Success',
        data: {
            id: workspace.id,
            name: workspace.name,
            color: workspace.color,
            isActive: workspace.isActive,
            owner: workspace.owner,
        }
    })
});

const editWorkspace = asyncHandler(async (req, res) => {
    const workspace = Workspace.findById(req.params.id)
    await workspace.update(req.body);
    res.send({
        message: 'Workspace updated',
        data: {
            id: workspace.id,
            name: workspace.name,
            color: workspace.color,
            isActive: workspace.isActive,
            owner: workspace.owner,
        }
    })
});

const shareWorkpaceEditorAccess = asyncHandler(async (req, res) => {
    const workspace = await Workspace.findById(req.params.id)
    if(!workspace) {
        res.status(404);
        throw new Error('Workspace not found');
    }
    req.body.editors.forEach(async(editor) => {
        isActiveUser(editor);
        const permissionParams = {
            userId: editor,
            resourceId: workspace.id,
            role: 'editor',
            permissions: {
                resource: 'workspace',
                operation: ['view', 'edit']
            }
        }
        await Permission.create(permissionParams);
    });
    res.send('Success, editor access granted')
});

const shareWorkpaceViewerAccess = asyncHandler(async (req, res) => {
    const workspace = await Workspace.findById(req.params.id)
    if(!workspace) {
        res.status(404);
        throw new Error('Workspace not found');
    }
    req.body.viewers.forEach(async(viewer) => {
        isActiveUser(viewer);
        const permissionParams = {
            userId: viewer,
            resourceId: workspace.id,
            role: 'viewer',
            permissions: {
                resource: 'workspace',
                operation: ['view']
            }
        }
        await Permission.create(permissionParams);
    })
    res.send('Success, viewer access granted')
});


module.exports = { createWorkspace, getWorkspaces, getWorkspace, editWorkspace, shareWorkpaceEditorAccess, shareWorkpaceViewerAccess };
