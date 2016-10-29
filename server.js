<<<<<<< Updated upstream
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var localenv = require('localenvironment');

var flutterwaveApiKey = process.env.flutterwave_API_KEY;
var flutterwaveMerchantKey = process.env.flutterwave_MERCHANT_KEY;

//Instantiate the class
var Flutterwave = require('flutterwave');
var flutterwave = new Flutterwave(flutterwaveApiKey, flutterwaveMerchantKey);

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var q = {
	Promise : function(executor){
		return new Promise(executor);
	}
};
var flutterwaveFunctions = {
		tokenize: function (tokenizeRequest) {
			return q.Promise(function (resolve, reject) {
				try {
					flutterwave.Card.tokenize(tokenizeRequest, function (error, response, body) {
						if (error) {
							reject(new Error(error));
						} else {
							var result = body.data;
							if (response.flutterwaveRequestSuccessful) {
								result.requiresValidation = false;
							} else {
								reject(result);
							}

							if (response.flutterwaveRequestRequiresValidation) {
								result.requiresValidation = true;
							}
							resolve(result);
						}
					});
				} catch (e) {
					reject(new Error(e));
				}
			});
		},
		charge: function (chargeRequest) {
			return q.Promise(function (resolve, reject) {
				try {
					flutterwave.Card.charge(chargeRequest, function (error, response, body) {
						if (error) {
							reject(new Error(error));
						} else {
							var result = body.data;
							if (response.flutterwaveRequestSuccessful) {
								result.requiresValidation = false;
							} else {
								reject(result);
							}

							if (response.flutterwaveRequestRequiresValidation) {
								result.requiresValidation = true;
							}
							resolve(result);
						}
					});
				} catch (e) {
					reject(new Error(e));
				}
			});
		},
		validate: function (validateRequest) {
			return q.Promise(function (resolve, reject) {
				try {
					flutterwave.Card.validate({
						otptransactionidentifier: otptransactionidentifier,
						otp: otp
					}, function (error, response, body) {
						if (error) {
							reject(new Error(error));
						} else {
							var result = body.data;
							if (response.flutterwaveRequestSuccessful) {
								result.requiresValidation = false;
							} else {
								reject(result);
							}

							if (response.flutterwaveRequestRequiresValidation) {
								result.requiresValidation = true;
							}
							resolve(result);
						}
					});
				} catch (e) {
					reject(new Error(e));
				}
			});
		}
	};

app.use(express.static('public'));
app.get('/index.html', function (req, res) {
	console.log("Got a GET request for the homepage");
	res.sendFile(__dirname + "/" + "index.html");
});

app.post('/make-payment', urlencodedParser, function (req, res, next) {

	var validateoption = 'SMS|VOICE';
	var authmodel = 'PIN';

	var cardno = req.body.ccnumber;
	var cvv = req.body.cvv_value;
	var expirymonth = req.body.ccdate_month;
	var expiryyear = req.body.ccdate_year;
	// var validateoption = req.body.validateoption; 
	// var authmodel = req.body.authmodel;
	var pin = req.body.pin;
	var amountcharged = req.body.amount;
	var currencyinput = req.body.currency;
	var narration = req.body.transaction_description;

	var tokenizeRequest = {
		'validateoption': validateoption, //'SMS|VOICE',
		'authmodel': authmodel, //'NOAUTH', /*Only NOAUTH and BVN are accepted*/ 
		"pin": pin, //"(Optional:Only needed where authmodel is BVN)",
		'cardno': cardno,
		'cvv': cvv,
		'expirymonth': expirymonth,
		'expiryyear': expiryyear
	};

	var chargeRequest = {
		"amount": amountcharged,
		"authmodel": authmodel,
		"cardno": cardno,
		"currency": currencyinput,
		"custid": "849389",
		"cvv": cvv,
		"expirymonth": expirymonth,
		"expiryyear": expiryyear,
		"narration": narration,
		//"responseurl": "http://valuex.com"
	};

	flutterwaveFunctions.tokenize(tokenizeRequest).then(function(response){
		flutterwaveFunctions.charge(chargeRequest).then(function(response){
			if(response.requiresValidation){
				// show user the response message
				var responseMessage = response.responsemessage;
				// take user to validation page and show responseMessage on the page
				res.sendFile(__dirname + "/" + "validate.html");
				res.send(responseMessage);
			}
			else{
				//take user to success page
				res.sendFile(__dirname + "/" + "success.html");
				
			}
		}, function(error){
			console.log(error);
			res.sendFile(__dirname + "/" + "error.html");
		});
	}, function(error){
		console.log(error);
		res.sendFile(__dirname + "/" + "error.html");
	});

});

app.get('/validate.html', function (req, res) {
	var otp = req.body.otp;
	var otptransactionidentifier = req.body.otptransactionidentifier;
	var validateRequest = {
		otptransactionidentifier: otptransactionidentifier,
        otp: otp
	};
	flutterwaveFunctions.validate(validateRequest).then(function(response){
		//take user to success page
		res.sendFile(__dirname + "/" + "success.html");
	}, function(error){
			res.sendFile(__dirname + "/" + "error.html");
	});

});

app.listen(8081, function () {
	console.log("Churchdonationapp listening at 8081")
});
=======
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
<<<<<<< HEAD
//Instantiate the class
var Flutterwave = require('flutterwave');
var flutterwave = new Flutterwave("","");
=======
>>>>>>> parent of a649c7a... Added flutterwave function for tokenizing charging and validation still work in progress

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
<<<<<<< HEAD
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


=======
>>>>>>> parent of a649c7a... Added flutterwave function for tokenizing charging and validation still work in progress

app.listen(8081, function () {

    console.log("Churchdonationapp listening at 8081")
});
>>>>>>> Stashed changes
