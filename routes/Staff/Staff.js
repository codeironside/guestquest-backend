const express = require('express')
const { loginStaff } = require('../../controller/Staff/login')
const Router = express.Router()


Router.route('/login').post(loginStaff)


module.exports = Router 