const mongoose = require("mongoose");
// const { level } = require("winston");
const STAFF = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "please add a first name "],
        },
        middleName: {
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
module.exports = mongoose.model("STAFF", STAFF);