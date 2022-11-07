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
    details.save((err, addData) => {
      res.status(200).send({ data: addData });
    });
  } catch (error) {
    res.status(500).send({ message: "Error data cannot be created" });
  }
});

//Update the data

//Delete the data
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const deleteData = await Data.findByIdAndDelete(id);
    if (!id) {
      res.status(400).send({ message: "No id is found" });
    }
    res.status(200).send(deleteData);
  } catch (err) {
    res.status(500).send({ message: "Error data cannot be deleted" });
  }
});

module.exports = router;
