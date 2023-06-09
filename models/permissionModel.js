const mongoose = require("mongoose");

const permissionSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        resourceId: {
            type: String,
            required: true
        },
        role: {
            type: String,
        },
        permissions: {
                resource: {
                  type: String,
                },
                operation: [
                    {
                        type: String, 
                    }
                ]
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Permission", permissionSchema);
