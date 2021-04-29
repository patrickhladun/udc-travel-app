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

// Get city lat and lng
// http://api.geonames.org/searchJSON?q=CITY&maxRows=1&username=USERNAME
// 


app.post('/destination', (req, res) => {
    const city = req.body.city;
    let data = {};
    const key = process.env.GEONAMES_KEY;
    const url = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${key}`;
    const options = { 
        method: 'GET'
    };

    fetch(url, options)
    .then(response => response.json())
    .then(response => {
        const { lat, lng, toponymName } = response.geonames[0];
        data = {
            city: toponymName,
            lat,
            lng
        }
        console.log(data);
    })
    .catch(error => console.log('error', error));

});

// app.get('/background', (req, res) => {
//     const key = process.env.PIXABAY_KEY;
//     const query = '&q=city&orientation=horizontal&image_type=photo&min_width=1200';
//     const url = `https://pixabay.com/api/?key=${key}${query}`;
//     const options = { 
//         method: 'POST' 
//     }

//     fetch(url, options)
//     .then(response => response.json())
//     .then(data => {
//         const randomImage = Math.floor(Math.random() * 20);
//         const image = data.hits[randomImage];
//         if(image !== undefined || image !== '') {
//             res.send({url:image.webformatURL});
//         }
//     })
//     .catch(error => console.log('error', error));
// });