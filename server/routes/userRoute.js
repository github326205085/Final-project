const verifyJWT = require("../middleware/verifyJWT")
const express = require("express")
const router = express.Router()
const usersController = require("../controllers/usersController")
 
router.use(verifyJWT)

router.get("/",usersController.getAllUsers)
router.get("/:id", usersController.getUserById)
router.post("/", usersController.createNewUser)
router.delete("/:id",usersController.deleteUser)
router.put("/",usersController.updateUser)
module.exports = router 
