const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:3,
        max:10,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        max:20,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        min:6,
    },
},{timestamps:true})

const USER=mongoose.model("USER",UserSchema);
module.exports=USER;