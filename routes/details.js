const express = require('express');
const app = express;
const router = require("express").Router();
const verifyToken = require('./verifyToken')
const { Data, validateData } = require("../models/data");
const dotenv = require("dotenv");
dotenv.config();


//Get the data
router.get("/", verifyToken, async (req, res) => {
  try {
    await Data.find({}).then((datas) => {
      res.status(200).send({ data: datas });
    });
  } catch (error) {
    res.status(500).send({ message: "Data cannot be found" });
  }
});

//Create the data
router.post("/", verifyToken, async (req, res) => {
  try {
    const { error } = validateData(req.body);

    if (error) {
      res.status(400).send({ message: error.details[0].message });
    }

    let details = await new Data(req.body);
    // console.log(details.creationDate);
    details.save((err, addData) => {
      res.status(200).send({ data: addData });
    });
  } catch (error) {
    res.status(500).send({ message: "Error data cannot be created" });
  }
});

//Update the data
router.put("/:id", verifyToken, async(req,res) => {
  try{
    
    const id = req.params.id;
    
    let updatedData = await Data.findOneAndUpdate({_id: id}, {
      title: req.body.title,
      description: req.body.description,
      technology: req.body.technology,
      experience: req.body.experience,
      code: req.body.code,
      client: req.body.client,
      postedBy: req.body.postedBy
    })

     if(!id) {
      res.status(400).send({ message: "No id is found" })
     }
     res.status(200).send(updatedData)
  }catch(error){
      // console.log(error)
     res.status(400).send({ message: "Error data cannot be updated" })
  }
})

//Delete the data
router.delete("/:id",  async (req, res) => {
  try {
    const id = req.params.id;
    const deleteData = await Data.findByIdAndDelete(id);
    if (!id) {
      res.status(400).send({ message: "No id is found" });
    }
    res.status(200).send(deleteData);
  } catch (error) {
    // console.log(err)
    res.status(500).send({ message: "Error data cannot be deleted" });
  }
});

module.exports = router;
