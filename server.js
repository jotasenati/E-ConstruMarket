const cors = require('cors');
const express = require('express');
const app = express();
const axios = require('axios');

app.use(cors());

app.get('/', async (req, res) => {
    try {
        const { data } = await axios('https://api.hgbrasil.com/weather?woeid=455827')
        // console.log(data.results.city)
        return res.json(data.results)
    } catch (error) {
        console.log(error)
    }


})

app.listen('1234')