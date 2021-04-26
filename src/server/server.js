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
    const key = process.env.GEONAMES_KEY;
    const url = `http://api.geonames.org/postalCodeSearch?postalcode=9011&maxRows=10&username=${key}`;
    const options = { 
        method: 'POST' 
    };

    fetch(url, options)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log('error', error));
});

app.get('/background', (req, res) => {
    const key = process.env.PIXABAY_KEY;
    const query = '&q=city&orientation=horizontal&image_type=photo&min_width=1200';
    const url = `https://pixabay.com/api/?key=${key}${query}`;
    const options = { 
        method: 'POST' 
    }

    fetch(url, options)
    .then(response => response.json())
    .then(data => {
        const randomImage = Math.floor(Math.random() * 20);
        const image = data.hits[randomImage];v
        if(image !== undefined || image !== '') {
            res.send({url:image.webformatURL});
        }
    })
    .catch(error => console.log('error', error));
});