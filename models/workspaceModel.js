const mongoose = require("mongoose");

const workspaceSchema = mongoose.Schema(
    {
        name: {
            type: String
        },
        color: {
            type: String,
            default: "#000000"
        },
        isActive: {
            type: Boolean,
            default: true
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Workspace", workspaceSchema);
