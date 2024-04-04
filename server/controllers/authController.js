const User = require("../models/Users")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const login = async (req, res) => {
    const { identity, password } = req.body

    if (!identity || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    const foundUser = await User.findOne({ identity }).lean()
    if (!foundUser) {
        return res.status(401).json({ message: `Unauthorized user` })
    }
    const match = await bcrypt.compare(password, foundUser.password)
    if (!match)
        return res.status(401).json({ message: `Unauthorized` })
    const userInfo = {
        _id: foundUser._id,
        identity: foundUser.identity,
        name: foundUser.name,
        address: foundUser.address,
        email: foundUser.email,
        phone: foundUser.phone,
        active: foundUser.active,
        role:foundUser.role
    }
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
    res.json({ token: accessToken ,role:userInfo.role,id:userInfo._id})
}
const register = async (req, res) => {
    const { identity, password, name, email, phone ,address} = req.body
    if (!identity || !name || !password||!address) {
        return res.status(400).json({ message: 'All fields are required' })
    } 

    const duplicate = await User.findOne({ identity: identity }).lean()
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate identity" })
    }
    const hashedPwd = await bcrypt.hash(password, 10)
    const userObject = { identity, email, name, phone,address, password: hashedPwd }
    const user = await User.create(userObject)
    if (user) {
        return res.status(201).json({
            message: `New user ${user.identity} created` })
    } else {
        return res.status(400).json({ message: 'Invalid user received' })
    }
}
module.exports = { login, register }