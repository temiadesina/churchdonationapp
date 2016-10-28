var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false})

app.use(express.static('public'));
app.get('/index.html', function(req, res) {
    console.log("Got a GET request for the homepage");
    res.sendFile( __dirname + "/" + "index.html");
});

app.post('/card-payment/', urlencodedParser, function(req, res){

  response = {
        ccnumber:req.body.ccnumber,
        ccdate_month:req.body.ccdate_month,
        ccdate_year:req.body.ccdate_year,
        cvv_value:req.body.cvv_value,
        currency:req.body.currency,
        amount:req.body.amount,
        transaction_description:req.body.transaction_description
    };

    console.log(response);
    res.end(JSON.stringify(response));
});

app.listen(8081, function () {

    console.log("Churchdonationapp listening at 8081")
});