const asyncHandler = require("express-async-handler")
const STAFF = require("../../model/Staff/Staff")
const { generateToken } = require('../../utils/generateToken.js')
const bcrypt = require("bcryptjs")



const loginStaff = asyncHandler(async (req, res) => {


        const { staffID, password } = req.body
        if (!staffID || !password) {
            throw Object.assign(new Error(' fields can not be blank'), { statusCode: 401 })
        }
        const StaffExist = await STAFF.findOne({ staffID: staffID })
        if (!StaffExist) {
            throw Object.assign(new Error('Invalid Credentials'), { statusCode: 400 })
        }
        if (await bcrypt.compare(password, StaffExist.password)) {
            const token = generateToken(StaffExist._id)
            res.status(202).header('Authorization', `Bearer ${ token }`).json({
                ...StaffExist._doc
            })
        }

    

})


module.exports = {
    loginStaff
} 