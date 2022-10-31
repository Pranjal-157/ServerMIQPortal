const router = require("express").Router();
const {Data, validateData} = require('../models/data')
const dotenv = require("dotenv");
dotenv.config();

//Get the data
// router.get('/', (req,res) => {
//    res.send([
//     {

//         title: 'what is typescript?',
  
//         description: 'what is typescript?',
  
//         technology: 'Angular',
  
//         creationDate: '1658799999929',
  
//         experience: '2-4 Years',
  
//         code: null,
  
//         client: 'Cisco',
  
//       },
  
//       {
  
//         title: 'explain about javascript closures?',
  
//         description: '',
  
//         technology: 'Javascript',
  
//         creationDate: '1665722294804',
  
//         experience: '2-4 Years',
  
//         code: null,
  
//         client: 'Samsung',
  
//       },
  
//       {
  
//         title: 'what is DI?',
  
//         description: 'what is dependency injection?',
  
//         technology: 'Angular',
  
//         creationDate: '1590319189931',
  
//         experience: '6+ Years',
  
//         code: null,
  
//         client: 'Digit',
  
//       },
  
//       {
  
//         title: 'explain about angular interpolation?',
  
//         description: 'what is interpolation?',
  
//         technology: 'Angular',
  
//         creationDate: '1648799999929',
  
//         experience: '4-6 Years',
  
//         code: null,
  
//         client: 'Cisco',
  
//       },
//    ]) 
// })

router.get('/', async(req,res) => {
  try{
    await Data.find({}).then(datas => {
      res.status(200).send({data: datas})
    })
  } catch(error){
    res.status(500).send({message: "Data cannot be found"})
  }
})


//Create the data
router.post('/', async(req,res) => {
  try{
  
     const {error} = validateData(req.body)

     if(error){
         res.status(400).send({message: error.details[0].message})
     }

   let details = await new Data(req.body)
   details.save((err, addData) => {
    res.status(200).send({data: addData})
   })

  } catch(error){
    res.status(500).send({message: "Error data cannot be created"})
   }
})


//Update the data




//Delete the data
router.delete('/:id', async(req,res) => {
   try{
      await Data().deleteOne({_id: req.params.id})
      .then(data => {
        res.status(200).send({message: "Content is deleted"})
      })
   } catch(err){
    res.status(500).send({message: "Error data cannot be deleted"})
   }
})


module.exports = router;