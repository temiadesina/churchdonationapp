var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//Instantiate the class
var Flutterwave = require('flutterwave');
var flutterwave = new Flutterwave("tk_mEe4fP2qaR9NwuyVt6jJ","tk_nxf7BVMmP9");

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false})

app.use(express.static('public'));
app.get('/index.html', function(req, res) {
    console.log("Got a GET request for the homepage");
    res.sendFile( __dirname + "/" + "index.html");
});
/** 
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
*/


app.post('/make-payment/', function(req, res, next){
		
		var validateoption = 'SMS|VOICE';
		var authmodel = 'BVN';

		var cardno = req.body.ccnumber;
		var cvv = req.body.cvv_value;
		var expirymonth = req.body.ccdate_month;
		var expiryyear = req.body.ccdate_year;
		// var validateoption = req.body.validateoption; 
		// var authmodel = req.body.authmodel;
		var bvn = req.body.bvnpin;
		
		flutterwave.Card.tokenize({
					'validateoption':validateoption, //'SMS|VOICE',
					'authmodel':authmodel, //'NOAUTH', /*Only NOAUTH and BVN are accepted*/ 
					"bvn": bvn, //"(Optional:Only needed where authmodel is BVN)",
					'cardno':cardno,
					'cvv':cvv,
					'expirymonth':expirymonth,
					'expiryyear':expiryyear

				},

				function(error, response, body){
							if(error){
							//return error page, 
							// find out how to pass a response into a served page in nodejs so you tell the user what went wrong
								var responseurl = res.body.status
                                
                                res.send('responseurl' + "try again" + res.redirect(/make-payment/));
							}else{
								var result =response.body.data; // this variable contains the data part of the response json
								if(response.flutterwaveRequestSuccessful){
									// tokenization was successful
									//you can then charge the card here
                                    app.post('/make-payment', function(req, res, next) {
                                        var amountcharged = req.body.amount;
                                        var currencyinput = req.body.currency;
                                        var narration = req.body.transaction_description;
									//Charge a card
									flutterwave.Card.charge
										( 
											{
												"amount": amountcharged,//2000
												"authmodel": authmodel,
												"cardno": cardno,
												"currency": currencyinput,
												"custid": "849389",
												"cvv": cvv, 
												"expirymonth": expirymonth,
												"expiryyear": expiryyear, 
												"narration": narration,
												//"responseurl": "http://valuex.com"

											} , 
											callback 
										);
                                    });
								}else{
									// display error page... 
									// find out how to pass a response into a served page in nodejs so you tell the user what went wrong
									res.sendFile( __dirname + "/" + "error.html");
								}
								if(response.flutterwaveRequestRequiresValidation){
									//you would not need this since you using noauth
									// but if you use BVN as authmodel, then this would be true
									// and it would mean you need to validate 
                                    
								}
                            }
            callback 
            );
});



app.listen(8081, function () {

    console.log("Churchdonationapp listening at 8081")
});