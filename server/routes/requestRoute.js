
const verifyJWT = require("../middleware/verifyJWT")
const express = require("express")
const router = express.Router()
const requestController = require("../controllers/requestController")
router.use(verifyJWT)
router.get("/",requestController.getAllRequest)
router.get("/ById", requestController.getRequestById)
router.post("/", requestController.createNewRequest)
router.delete("/",requestController.deleteRequest)
router.put("/",requestController.updateRequest)
router.put("/status",requestController.updateRequestStatus)
module.exports = router