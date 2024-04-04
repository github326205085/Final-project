const User = require("../models/Users");
const Request = require("../models/Request");
const Loans = require("../models/Loan");

const bcrypt = require('bcrypt')
const getAllUsers = async (req, res) => {
    console.log(req.user);
    if(req.user.role!=="edmit"){
        return res.status(400).json({ message: 'No permision' })
    }
    const users = await User.find({}, { password: 0 }).lean()
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }
    res.json(users)
}

const createNewUser = async (req, res) => {

// if(req.user.role!=="edmit"){
//         return res.status(400).json({ message: 'No permision' })
//     }
    const { name, identity, password, email, address, phone, role } = req.body
    if (!name || !identity || !password || !phone || !address || !role) {
        return res.status(400).json({ message: 'name, password, identity, phone and address is required' })
    }
    if (role !== "edmit" & role !== "user") {
        return res.status(400).json({ message: 'Mistake in the role' })
    }
    const users = await User.find().lean()
    if (users.find((user) => password === user.password))
        return res.status(400).json({ message: 'There is entherone with this password in the collection' })

    const hashedPwd = await bcrypt.hash(password, 10)
    const user = await User.create({ name, identity, password: hashedPwd, email, address, phone, role })
    if (user) {
        return res.status(201).json({ message: 'New user created' })
    } else {
        return res.status(400).json({ message: 'Invalid user ' })
    }
}

const getUserById=async (req, res) => {
    if(req.user.role!=="edmit"){
        return res.status(400).json({ message: 'No permision' })
    }
    const {id} = req.params
    const user = await User.findById(id).lean()
    if (!user) {
    return res.status(400).json({ message: 'No user found' })
    }
    res.json(user)
}

const updateUser = async (req, res) => {

    const {name, identity, password, email, address, phone, active } = req.body
    if (!name || !identity || !password || !phone || !address) {
        return res.status(400).json({ message: 'fields are required' })
    }

    const users = await User.find().lean()
    const hashedPwd = await bcrypt.hash(password, 10)

    if (users.find((user) => hashedPwd === user.password))
        return res.status(400).json({ message: 'There is entherone with this name in the collection' })

        const user = await User.findById(req.user._id).exec()
    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }
    user.active = active
    user.password = hashedPwd
    user.email = email
    user.address = address
    user.phone = phone
    user.name = name
    user.identity = identity
    const updatedUser = await user.save()
    res.json(`'${updatedUser.name}' updated`)
}


const deleteUser = async (req, res) => {
    
    const { id } = req.params
    const user = await User.findById(id).exec()
    
    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }
    if(user.active){
        return res.status(400).json({ message: 'User is active' })
    }
    const loansOfUser = await Loans.find({user:id}).exec()
    const requestsOfUser = await Request.find({user:id}).exec()
    loansOfUser.forEach(async(loan) => {
        await loan.deleteOne()
    });
    requestsOfUser.forEach(async(request) => {
        await request.deleteOne()
    });
    // const delReq = await requestsOfUser.deleteMany({})
    // const delLoan = await loansOfUser.deleteMany({})
    const result = await user.deleteOne()
    const reply = `User '${result.name}' ID ${result._id} deleted`
    res.json(reply)
}


module.exports = { getAllUsers, createNewUser, getUserById, updateUser, deleteUser }

