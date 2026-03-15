const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const protect = require("../middleware/authMiddleware");

// create event

router.post("/" , protect , async(req,res)=>{
    try{
        if(req.user.role !=="admin"){
            return res.status(403).json({message : "Access denied"});
        }

        const event = await Event.create({
            titles : req.body.title,
            description : req.body.description,
            date:req.body.date,
            location : req.body.location,
            createdBy : req.user.id,
        });

        res.status(201).json(event);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});


// get all events

router.get("/",async(req,res)=>{
    try{
        const events = await Event.find().populate("createdBy" , "name email" );
        res.json(events);
    }

    catch(error){
        res.status(500).json({message: error.message});
    }
});


// get sigle event

router.get("/:id",async(req,res)=>{
    try{
        const event = await Event.findById(req.params.id).populate("createdBy" ,"name email");

        if(!event){
            return res.status(404).json({message:"Event not found"});
        }

        res.json(event);
    }
    catch(error){
        res.status(500).json({message : error.message});
    }
});


// update event (admin)

router.put("/:id" , protect,async(req,res)=>{
    try{
        if(req.user.role !="admin"){
            return res.status(403).json({message:"Access denied"});
        }

        const event = await Event.findByIdAndDelete(
            req.params.id , 
            req.body,
            {new : true}
        );

        res.json(event);
    }

    catch(error){
        res.status.json({message : error.message});
    }
});


// delete event (admin)

router.delete("/:id" , protect,async(req,res)=>{
    try{
        if(req.user.role !="admin"){
            return res.status(403).json({message:"Access denied"});
        }

        await Event.findByIdAndDelete(req.params.id);
        res.json({message : "Event deleted successfully"});
    }

    catch(error){
        res.status(500).json({message:error.message});
    }
});

module.exports = router;