const asyncHandler = require("express-async-handler");
const STAFF = require("../../model/Staff/Staff");
const { generateToken } = require('../../utils/generateToken.js');
const bcrypt = require("bcryptjs");

const loginStaff = asyncHandler(async (req, res, next) => {
    try {
        const { staffID, password } = req.body;

        if (!staffID || !password) {
            next(Object.assign(new Error('fields can not be blank'), { statusCode: 401 }));
        }

        const StaffExist = await STAFF.findOne({ staffID });
        if (!StaffExist) {
            next(Object.assign(new Error('Invalid Credentials'), { statusCode: 400 }));
        }
        const isPasswordMatch = await bcrypt.compare(password, StaffExist.password);
        if (!isPasswordMatch) {
            return next(Object.assign(new Error('Invalid Credentials'), { statusCode: 400 }));
        }
        const token = generateToken(StaffExist._id);
        res.status(202).header('Authorization', `Bearer ${token}`).json({
            staffID: StaffExist.staffID,
        });
    } catch (error) {

        next(Object.assign(new Error('server error'), { statusCode: error.statusCode || 500 }));
    }
});

module.exports = {
    loginStaff
};
