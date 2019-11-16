const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

let Students = require("./routes/Students");

app.use('/students', Students)

app.listen(port, () => {
    console.log('Server is running at the port: ', port)
})