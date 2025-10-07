const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

app.use(express.json());
app.use("/", require("./routes/authRouter"))

mongoose.connect(process.env.MONGO_URL)
 .then(()=>console.log("TK_NightPlayer Database Connected!"))
 .catch((err) => console.log("Error Connecting TK_Night Player!", err ))

const PORT = 4000;
app.listen(PORT, ()=>{
    console.log(`Night player is running at port ${PORT}`);
})