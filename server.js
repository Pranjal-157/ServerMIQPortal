const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 8000;

const app = express();
const details = require('./routes/details')
app.use(cors());
app.use(bodyParser.json());

app.use('/details', details);
app.get('/', (req,res) => {
   res.send('Hello from server')
});


app.listen(port, () => {
    console.log(`The Port is running on localhost: ${port}`)
})
