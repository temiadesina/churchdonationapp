
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
