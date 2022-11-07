const mongoose = require("mongoose");
const Joi = require("joi");
const dotenv = require("dotenv");
dotenv.config();

const Schema = mongoose.Schema;

const dataSchema = new Schema({
  title: { type: String, required: true, maxlength: 70, trim: true },
  description: { type: String, trim: true },
  technology: { type: String, required: true, maxlength: 15, trim: true },
  experience: { type: String, required: true, trim: true },
  code: { type: String, trim: true },
  client: { type: String, required: true, maxlength: 10, trim: true },
  postedBy: { type: String, required: true, maxlength: 30, trim: true },
  creationDate: {type: String, default: new Date().getTime().toString()}
});

const Data = mongoose.model("Data", dataSchema);

const validateData = (data) => {
  const schema = Joi.object({
    title: Joi.string().required().label("Title"),
    description: Joi.string().label("Description"),
    technology: Joi.string().required().label("Technology"),
    experience: Joi.string().required().label("Experience Level"),
    code: Joi.string().allow(null).label("Code No"),
    client: Joi.string().required().label("Client Name"),
    postedBy: Joi.string().required().label("Posted By")
  });
  return schema.validate(data);
};

module.exports = { Data, validateData };
