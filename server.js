const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

const app = express();
const api = require('./routes/api')
app.use(bodyParser.json());

app.use('/api', api);
app.get('/', (req,res) => {
   res.send('Hello from server')
});


app.listen(port || 5000, () => {
    console.log(`The Port is running on localhost: ${port}`)
})
