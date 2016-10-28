'use strict';
var expect  = require('chai').expect;
var flwBase = require('../lib/flw.base');
var flwAccount = require('../lib/flw.account');

describe('#FlutterwaveAccountTest', function () {

	it('Should throw accountToken is required error', function () { 
	    var flutterwavebase = new flwBase('tk_NabYp2XjZ6G9WwdFruzK','tk_tdyrSMQo8a');
		var flutterwaveaccount = new flwAccount(flutterwavebase);
	    function testAccountPay(){
	    	flutterwaveaccount.chargeRecurrentAccount({}, function () {});
	    }
	    expect(testAccountPay).to.throw('accountToken is required');
	});  


	it('Should return "Successful, pending OTP validation"', function (done) { 
		this.timeout(50000);
	    var flutterwavebase = new flwBase('tk_NabYp2XjZ6G9WwdFruzK','tk_tdyrSMQo8a');
		var flutterwaveaccount  = new flwAccount(flutterwavebase);
		/*console.log*/(flutterwaveaccount.initiateRecurrentPayment('0690000001', function (err, res, body) { //console.log(err,body);
			expect(body).to.have.property('data'); 
			expect(body.data.responseMessage).to.equal('Successful, pending OTP validation');
			done(); 
		}));
	     
	}); 


	it('Should return "Approved Or Completed Successfully"', function (done) {
		this.timeout(50000);
	    var flutterwavebase = new flwBase('tk_NabYp2XjZ6G9WwdFruzK','tk_tdyrSMQo8a');
		var flutterwaveaccount  = new flwAccount(flutterwavebase);
		/*console.log*/(flutterwaveaccount.resolveAccount({
			"destbankcode":"058",
			"recipientaccount":"0921318712",
		}, function (err, res, body) { //console.log(err,body);
			expect(body).to.have.property('data'); 
			expect(body.data.responsemessage).to.equal('Approved Or Completed Successfully');
			done(); 
		}));
	     
	});

	it('Should return "Sorry, that account has been linked. Please check and try again!"', function (done) {
		this.timeout(50000);
		var flutterwavebase = new flwBase('tk_NabYp2XjZ6G9WwdFruzK','tk_tdyrSMQo8a');
		var flutterwaveaccount  = new flwAccount(flutterwavebase);
		(flutterwaveaccount.linkAccount({
			"accountnumber":"0690000001"
		}, function (err, res, body) { console.log(err,body);
			expect(body).to.have.property('data');
			expect(body.data.responsemessage).to.equal('Sorry, that account has been linked. Please check and try again!');
			done();
		}));

	});

	it('Should return "responsecode R3"', function (done) {
		this.timeout(50000);
		var flutterwavebase = new flwBase('tk_NabYp2XjZ6G9WwdFruzK','tk_tdyrSMQo8a');
		var flutterwaveaccount  = new flwAccount(flutterwavebase);
		(flutterwaveaccount.validateAccountLinking({
			"otp":"12345",
			"otptype":"PHONE_OTP",
			"relatedreference":"0690000001"
		}, function (err, res, body) { console.log(err,body);
			expect(body).to.have.property('data');
			expect(body.data.responsecode).to.equal('R3');
			done();
		}));

	});

	it('Should return responsecode "00"', function (done) {
		this.timeout(50000);
		var flutterwavebase = new flwBase('tk_NabYp2XjZ6G9WwdFruzK','tk_tdyrSMQo8a');
		var flutterwaveaccount  = new flwAccount(flutterwavebase);
		(flutterwaveaccount.getLinkedAccounts({}, function (err, res, body) { // console.log(err,body);
			expect(body).to.have.property('data');
			expect(body.data).to.have.property('linkedaccounts');
			expect(body.data.responsecode).to.equal('00');
			done();
		}));

	});

	it('Should return "responsecode R3"', function (done) {
		this.timeout(50000);
		var flutterwavebase = new flwBase('tk_NabYp2XjZ6G9WwdFruzK','tk_tdyrSMQo8a');
		var flutterwaveaccount  = new flwAccount(flutterwavebase);
		(flutterwaveaccount.sendPayment({
			"accounttoken": "qRyPWB60dR63t8XDc97aEg",
			"destbankcode": "044",
			"uniquereference": "1234568901",
			"country": "NIGERIA",
			"currency": "NGN",
			"transferamount": "100.00",
			"narration": "Test Send Money",
			"recipientname": "John Doe",
			"sendername": "John Walker",
			"recipientaccount": "0690000021"
		}, function (err, res, body) { console.log(err,body);
			expect(body).to.have.property('data');
			expect(body.data.responsecode).to.equal('R3');
			done();
		}));

	});


	

});