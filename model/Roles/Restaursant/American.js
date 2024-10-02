const mongoose = require("mongoose");
// const { level } = require("winston");
const American = mongoose.Schema(
    {
        Create: {
            type: Boolean,
            required: [true, "please add a value "],
            default:false
        },
        View: {
            type: String,
        },
        lastName: {
            type: String,
            required: [true, "please add a last name "],
        },
        profile_image: {
            type: String,
        },
        StaffID: {
            type: String,
            required: [true, "please add a user name "],
            unique: true,
        },
        email: {
            type: String,
            required: [true, "please add an email "],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "please add a password "],
            default: "123456789"
        },
        role: {
            type: String,
            required: [true, "please specify a role"],
            default: "STAFF",
        },
        level: {
            type: String,
            required: [true, "please specify a role"],
            default: "1",
        },

    },

    {
        timestamps: true,
    }
);
module.exports = mongoose.model("American", American);