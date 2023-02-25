const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');


const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {

    res.sendFile(__dirname + '/signup.html')

});

app.post('/', (req, res) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }

            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = 'https://us12.api.mailchimp.com/3.0/lists/4bd4e470c1';
    
    const options = {
        method: 'POST',
        auth: 'jude:f335c502ccb794158ca5bb4a78ac002e-us12'
    }

    const request = https.request(url, options, (response) => {
        
        if (response.statusCode === 200) {
            res.sendFile(__dirname + '/success.html');
        } else {
            res.sendFile(__dirname + '/fail.html');
        }
    });

    request.write(jsonData);
    request.end();

});

app.post('/fail', (req, res) => {

    // res.sendFile(__dirname + '/signup.html');
    // or
    res.redirect('/');

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log('Serve is running on port 3000');
});


// API KEY
// f335c502ccb794158ca5bb4a78ac002e-us12

// AUDIENCE ID
// 4bd4e470c1

// Github Access Token
// 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