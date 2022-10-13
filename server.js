const express = require('express');
const bodyParser = require('body-parser');

const PORT = 8080;

const app = express();
const api = require('./routes/api')
app.use(bodyParser.json());

app.use('/api', api);
app.get('/', (req,res) => {
   res.send('Hello from server')
});



app.listen(PORT, () => {
    console.log(`The Port is running on localhost: ${PORT}`)
})
