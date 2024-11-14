const express=require("express");
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const pingroute=require("./routes/Ping")
const userroute=require("./routes/user");
const cors = require('cors')
const app=express()
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000", // frontend URL
    credentials: true,
  }));
dotenv.config()
mongoose.connect(process.env.MONGOURL).then(()=>{
    console.log("database connected")
}).catch((err)=>{console.log(err)})

app.use("/api/ping",pingroute);
app.use("/api/users",userroute);











app.listen(8871,()=>{
    console.log("server is running ")
})