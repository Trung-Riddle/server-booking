import express from "express";
require("dotenv").config()
import cors from "cors";
import initRoutes from "./routes"
import connectDb from "./config/connect";
// import generateCode from "./utils/generateCode";

// console.log(generateCode('Cho thuê nhà Quận 5'))
const app = express()
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", "GET", "PUT", "DELETE"]
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.get('/', (req, res) => {
    res.send('server on...')
})
const port = process.env.PORT || 8119
initRoutes(app)
connectDb()
app.listen(port, () => {
    console.log(`Server is running on local >>> http://localhost:${port}`);
})