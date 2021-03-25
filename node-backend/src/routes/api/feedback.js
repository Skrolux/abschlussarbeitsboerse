var request = require('request');

const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    var options = {
        'method': 'POST',
        'url': 'https://prod-02.germanywestcentral.logic.azure.com:443/workflows/5f0642c0b5cc4c9bbdb20b3732770bee/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=LCQVXb7aoJiyfsYDyusPXq0Ahc0IZQB-fNN9ccZ0Xyg',
        'headers': {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    };

    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });
});

module.exports = router;
