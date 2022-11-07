const app = require('express')
const router = app.Router();
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

router.use(app.json());

router.use((req,res,next) => {
  let token = req.headers['authorization'];
  console.log(token);
  const tokenValue = token.split(' ')[1]
  console.log(tokenValue);

  if(tokenValue){
    jwt.verify(tokenValue, process.env.JWTPRIVATEKEY, (err,decoded) => {
      if(err){
        let errorData = {
          message: err.message,
          expiredAt: err.expiredAt
        }
        console.log(errorData);
        return res.status(401).send({message: 'Unauthorized access'});
      }
      req.decoded = decoded;
      console.log(decoded);
      next();
    })
  } else {
    return res.status(403).send({message: 'Forbidden Access'})
  }
});

module.exports = router;