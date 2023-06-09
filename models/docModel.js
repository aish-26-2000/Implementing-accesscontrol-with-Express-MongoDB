const mongoose = require("mongoose");

const docSchema = mongoose.Schema(
    {
        name: {
            type: String
        },
        parentNode: {
            type: String,
        },
        childNodes:{
            type: Array,
            default: []
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

module.exports = mongoose.model("Document", docSchema);
