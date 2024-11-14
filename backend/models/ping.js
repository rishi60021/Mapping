const mongoose=require("mongoose");

const PingSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
        min:5,
        max:10,

    },
    desc:{
        type:String,
        required:true,
        max:20,
    },
    rating:{
        type:Number,
        required:true,
        min:0,
        max:5,
    },
    lat:{
        type:Number,
        req:true,
    },
    longi:{
        type:Number,
        required:true,
    }
},{timestamps:true})
const PING=mongoose.model("PING",PingSchema);
module.exports=PING;