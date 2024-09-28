const asyncHander = require("express-async-handler")
const generateToken = require("../../utils/generateToken")
const generateStaffId = require("../../utils/staffIdgenerator");
const Staff = require("../../model/Staff/Staff");
const { level } = require("winston");



const register_staff = asyncHander(async (req, res) => {
    const { First_name.Middle_name, Last_name, email, role, Level } = req.body;
    if (!First_name|| !Last_name || !email || !password || !role || !Level
    ) {
        throw Object.assign(new Error(`field can not be empty`), {
            status: 409
        })


    }
    const emailExist = await Staff.findOne({ email: email })
    if (emailExist) {
        throw Object.assign(new Error(`Email already exist`), { status: 301 })
    }
    const staffID = await generateStaffId(First_Nmae)
    const staff = await Staff.create({
        First_name: First_name,
        Middle_name: Middle_name,
        Last_name: Last_name,
        email: email,
        staffID: staffID,
        role: role,
        level:Level 
    })
    const token = generateToken(staff._id)
    if (staff) {
        res.status(202).Header(Authorization, `Bearer ${token}`).({
            ..staff._doc
        })
    }
})