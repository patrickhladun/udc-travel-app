const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const fetch = require('node-fetch');
const { response } = require('express');

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const port = 8080;
const server = app.listen(port, () => console.log(`Running on port: ${port}`));

app.use(express.static('public'));

app.post('/geonames', (req, res) => {
    const username = rocess.env.GEONAMES_USER;
    fetch(`http://api.geonames.org/postalCodeSearch?postalcode=9011&maxRows=10&username=${username}`, { 
        method: 'POST' 
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log('error', error));
});