const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { response } = require('express');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const port = 8080;
const server = app.listen(port, () => console.log(`Running on port: ${port}`));

app.use(express.static('public'));

let projectData = {};

app.get('/entry', (req, res) => {
    res.send(projectData);
});

app.post('/entry', (req, res) => {
    projectData = req.body;
});