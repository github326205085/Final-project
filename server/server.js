require("dotenv").config()
const express = require("express")
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/dbConn")
const { default: mongoose } = require("mongoose") 
const PORT = process.env.PORT || 9222
const app = express()
const path=require("path")

connectDB()

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))
 
app.get('/uploads/:filename', (req, res) => {
    console.log(req.params.filename);
    const imagePath = path.join(__dirname, '/public/upload/', req.params.filename);
    res.sendFile(imagePath, { headers: { 'Content-Type': 'image/jpeg' } });
});
app.use('/uploads', express.static(__dirname + '/public/upload'));

console.log(process.env.NODE_ENV)
app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/requests", require("./routes/requestRoute"))
app.use("/api/loans", require("./routes/loanRoute"))
app.use("/api/users", require("./routes/userRoute"))
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port
    ${PORT}`))
    })
mongoose.connection.on('error', err => {
    console.log(err)
    })