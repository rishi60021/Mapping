const router = require("express").Router();
const ping = require("../models/ping");
//create pin
router.post("/", async (req, res) => {
  const newping =  new ping(req.body);
  try {
    const savedping = await newping.save();
    res.json(savedping);
  } catch (err) {
    res.json(err);
  }
});
//get all users
router.get("/",async(req,res)=>{ 
    try{
        const pins=await ping.find({});
        res.json(pins);
    }
    catch(err){
        res.json(err);
    }
})

module.exports=router;