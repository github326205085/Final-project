
const verifyJWT = require("../middleware/verifyJWT")
const express = require("express")
const multer = require("multer")
const router = express.Router()
const loanController = require("../controllers/loanController")
// const upload = multer({ dest: './public/upload/' })
const upload = multer({ dest: './public/upload/' })
router.use(verifyJWT)

router.get("/",loanController.getAllLoans)
router.get("/byUser", loanController.getAllLoansByUser)
router.post("/",loanController.createNewLoan)
router.delete("/",loanController.deleteLoan)
router.put("/",loanController.updateLoan)
router.put("/wefts",loanController.updateWeft)
router.put("/status/:id",loanController.updateLoanStatus)
router.put("/approval/:id",loanController.updateLoanApproval)
router.put("/take/:id",loanController.updateLoanTake)
// router.put("/returnApproval",upload.single('Img'),loanController.updateReturnApproval)
router.put("/returnApproval", upload.single('Img'), loanController.updateReturnApproval)

module.exports = router
