const Request = require("../models/Request");

const getAllRequest = async (req, res) => {

    if(req.user.role!=="edmit"){
        return res.status(400).json({ message: 'No permision' })
    }
    const requests = await Request.find({}).populate("user", { password: 0 }).lean()
    if (!requests?.length) {
        return res.status(400).json({ message: 'No requests found' })
    }
    res.json(requests)
}

const createNewRequest = async (req, res) => {

    const { count } = req.body
    if (!count) {
        return res.status(400).json({ message: 'count is required' })
    }
    const request = await Request.create({  user: req.user._id, count })
    if (request) {
        return res.status(201).json({ message: 'New request created' })
    } else {
        return res.status(400).json({ message: 'Invalid request ' })
    }
}

const getRequestById = async (req, res) => {

    const request = await Request.find({ user: req.user._id }).populate("user", { password: 0 }).lean()
    if (!request) {
        return res.status(400).json({ message: 'No request found' })
    }
    res.json(request)
}

const updateRequest = async (req, res) => {
    const { _id, count} = req.body
    if (!_id  || !count) {
        return res.status(400).json({ message: 'fields are required' })
    }
    const request = await Request.findById(_id).exec()
    if (!request) {
        return res.status(400).json({ message: 'Request not found' })
    }
    request.count = count
    const updatedRequest = await request.save()
    res.json(`'${updatedRequest.user}' updated`)
}

const updateRequestStatus = async (req, res) => {
    if(req.user.role!=="edmit"){
        return res.status(400).json({ message: 'No permision' })
    }
    const { id } = req.body
    console.log(id);
    const request = await Request.findById(id)
    if (!request) {
        return res.status(400).json({ message: 'Request not found' })
    }
    request.status = !request.status
    const updatedRequest = await request.save()
    res.json(`One request updated`)
}

const deleteRequest = async (req, res) => {
    const { id } = req.body
    const request = await Request.findById(id).exec()
    if (!request) {
        return res.status(400).json({ message: 'Request not found' })
    }
    const result = await request.deleteOne()
    const reply = `Request deleted`
    res.json(reply)
}


module.exports = { getAllRequest, createNewRequest, getRequestById, updateRequest, updateRequestStatus, deleteRequest }    