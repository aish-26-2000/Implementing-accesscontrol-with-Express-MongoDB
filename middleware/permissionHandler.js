const Permission = require('../models/permissionModel');

const permissionHandler = (resource, operation) => {
    return async (req, res, next) => {
        const userId = req.user.id;
        Permission.findOne({
            userId: userId,
            'permissions.resource': resource,
        }).then((permission) => {
            if (permission) {
                const permissionOperation = permission.permissions.operation;
                if (permissionOperation.includes(operation)) {
                    next();
                } else {
                    res.status(401);
                    throw new Error("You don't have permission to perform this operation");
                }
            } else {
                res.status(401);
                throw new Error("You don't have permission to perform this operation");
            }
        }).catch((err) => {
            res.status(500);
            throw new Error(err);
        });
    }
};

const roleHandler = (resource, role) => {
    return async (req, res, next) => {
        const userId = req.user.id;
        Permission.findOne({
            userId: userId,
            role: role,
            'permissions.resource': resource,
        }).then((permission) => {
            if (permission) {
                next();
            } else {
                res.status(401);
                throw new Error("You don't have permission to perform this operation");
            }
        }).catch((err) => {
            res.status(500);
            throw new Error(err);
        });
    }
};

module.exports = { permissionHandler, roleHandler };