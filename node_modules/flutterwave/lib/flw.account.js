
/**
* Flutterwave Account class
*
* @class FlutterwaveAccount
* @constructor
*/ 

var FlutterwaveAccount = function (FlutterwaveBase) { 


	/**
	* Charge (for collecting payment from a bank account)
	*
	* @method charge
	* @param {Object} paymentData {accountNumber, amountToPay, creditAccountNumber, trxref, narration, merchantid}
	* @param {Function} callback
	*/ 
	this.charge = function (paymentData, callback) { 

		var requestParams      = {};
		paymentData.merchantid = FlutterwaveBase.getMerchantKey();
		requestParams.data     = FlutterwaveBase.validateAndEncryptParams(paymentData, this.endpointParamSpec('/accessbank/pay'), FlutterwaveBase.getMerchantAPIKey());
		requestParams.method   = 'POST'; 
		return FlutterwaveBase.makeRequest('bank/pay',  requestParams, callback);

	}

	/**
	* Validate (For validating pending transactions from a bank account)
	*
	* @method charge
	* @param {Object} paymentData {accountToken, amountToPay, trxref}
	* @param {Function} callback
	*/ 
	this.validate = function (paymentData, callback) { 

		var requestParams      = {};
		paymentData.merchantid = FlutterwaveBase.getMerchantKey();
		requestParams.data     = FlutterwaveBase.validateAndEncryptParams(paymentData, this.endpointParamSpec('/pay/validate'), FlutterwaveBase.getMerchantAPIKey());
		requestParams.method   = 'POST'; 
		return FlutterwaveBase.makeRequest('bank/pay/validate',  requestParams, callback);

	}


	/**
	* Initiate (For setting up a bank account for recurrent payment)
	*
	* @method pay
	* @param {String} accountNumber
	* @param {Function} callback
	*/ 
	this.initiateRecurrentPayment = function (accountNumber, callback) {  
		var requestParams         = {};
		var paymentData           = {};
		paymentData.accountNumber = accountNumber;
		paymentData.merchantid    = FlutterwaveBase.getMerchantKey();
		requestParams.data        = FlutterwaveBase.validateAndEncryptParams(paymentData, this.endpointParamSpec('/recurrent/account'), FlutterwaveBase.getMerchantAPIKey());
		requestParams.method      = 'POST'; 
		return FlutterwaveBase.makeRequest('recurrent/account',  requestParams, callback);

	}


	/**
	* Validate (For validating a bank account been setup for recurrent payment)
	*
	* @method validate
	* @param {Object} paymentData {accountNumber, otp, reference, billingamount, debitnarration}
	* @param {Function} callback
	*/ 
	this.validateRecurrentAccount = function (paymentData, callback) { 

		var requestParams      = {};
		paymentData.merchantid = FlutterwaveBase.getMerchantKey();
		requestParams.data     = FlutterwaveBase.validateAndEncryptParams(paymentData, this.endpointParamSpec('/account/validate'), FlutterwaveBase.getMerchantAPIKey());
		requestParams.method   = 'POST'; 
		return FlutterwaveBase.makeRequest('recurrent/account/validate',  requestParams, callback);

	}


	/**
	* Charge (For charging a bank account that has been setup for recurrent payment)
	*
	* @method charge
	* @param {Object} paymentData {merchantid, accountToken, billingamount, debitnarration}
	* @param {Function} callback
	*/ 
	this.chargeRecurrentAccount = function (paymentData, callback) { 

		var requestParams      = {};
		paymentData.merchantid = FlutterwaveBase.getMerchantKey();
		requestParams.data     = FlutterwaveBase.validateAndEncryptParams(paymentData, this.endpointParamSpec('/account/charge'), FlutterwaveBase.getMerchantAPIKey());
		requestParams.method   = 'POST'; 
		return FlutterwaveBase.makeRequest('recurrent/account/charge',  requestParams, callback);

	}


	/**
	* Resolve an account (Get information about an account owner)
	*
	* @method resolveAccount
	* @param {Object} accountData {destbankcode, recipientaccount, merchantid}
	* @param {Function} callback
	*/ 
	this.resolveAccount = function (accountData, callback) { 

		var requestParams      = {};
		accountData.merchantid = FlutterwaveBase.getMerchantKey();
		requestParams.data     = FlutterwaveBase.validateAndEncryptParams(accountData, this.endpointParamSpec('/account/resolve'), FlutterwaveBase.getMerchantAPIKey());
		requestParams.method   = 'POST'; 
		return FlutterwaveBase.makeRequest('pay/resolveaccount',  requestParams, callback);

	}

	/**
	 * linkAccount (for linking a bank account)
	 *
	 * @method linkAccount
	 * @param {Object} accountData {accountnumber, merchantid}
	 * @param {Function} callback
	 */
	this.linkAccount = function (accountData, callback) {

		var requestParams      = {};
		accountData.merchantid = FlutterwaveBase.getMerchantKey();
		requestParams.data     = FlutterwaveBase.validateAndEncryptParams(accountData, this.endpointParamSpec('/account/link'), FlutterwaveBase.getMerchantAPIKey());
		requestParams.method   = 'POST';
		return FlutterwaveBase.makeRequest('pay/linkaccount',  requestParams, callback);

	}

	/**
	 * validateAccountLinking (for linking a bank account)
	 *
	 * @method validateAccountLinking
	 * @param {Object} accountData {otp, relatedreference, otptype, merchantid}
	 * @param {Function} callback
	 */
	this.validateAccountLinking = function (accountData, callback) {

		var requestParams      = {};
		accountData.merchantid = FlutterwaveBase.getMerchantKey();
		requestParams.data     = FlutterwaveBase.validateAndEncryptParams(accountData, this.endpointParamSpec('/account/link/validate'), FlutterwaveBase.getMerchantAPIKey());
		requestParams.method   = 'POST';
		return FlutterwaveBase.makeRequest('pay/linkaccount/validate',  requestParams, callback);

	}

	/**
	 * getLinkedAccounts (for getting all linked accounts)
	 *
	 * @method getLinkedAccounts
	 * @param {Object} accountData {merchantid}
	 * @param {Function} callback
	 */
	this.getLinkedAccounts = function (accountData, callback) {

		var requestParams      = {};
		accountData.merchantid = FlutterwaveBase.getMerchantKey();
		requestParams.data     = FlutterwaveBase.validateAndEncryptParams(accountData, this.endpointParamSpec('/account/link/get'), FlutterwaveBase.getMerchantAPIKey());
		requestParams.method   = 'POST';
		return FlutterwaveBase.makeRequest('pay/getlinkedaccounts',  requestParams, callback);

	}

	/**
	 * sendPayment (for sending payment to an accountnumber)
	 *
	 * @method sendPayment
	 * @param {Object} paymentData {accounttoken, destbankcode, uniquereference, country, currency, transferamount, narration, recipientname, sendername, recipientaccount, merchantid}
	 * @param {Function} callback
	 */
	this.sendPayment = function (paymentData, callback) {

		var requestParams      = {};
		paymentData.merchantid = FlutterwaveBase.getMerchantKey();
		requestParams.data     = FlutterwaveBase.validateAndEncryptParams(paymentData, this.endpointParamSpec('/account/pay/send'), FlutterwaveBase.getMerchantAPIKey());
		requestParams.method   = 'POST';
		return FlutterwaveBase.makeRequest('pay/send',  requestParams, callback);

	}

	/**
	 * Charge an (non access) account number (Method 2 Charge an account number)
	 *
	 * @method sendPayment
	 * @param {Object} paymentData {narration, accountnumber, bankcode, passcode, amount, currency, firstname, lastname, email, transactionreference}
	 * @param {Function} callback
	 */
	 this.chargeM2 = function (chargeM2Data, callback) {
	 	var requestParams      = {};
		chargeM2Data.merchantid = FlutterwaveBase.getMerchantKey();
		requestParams.data     = FlutterwaveBase.validateAndEncryptParams(chargeM2Data, this.endpointParamSpec('/account/chargeM2'), FlutterwaveBase.getMerchantAPIKey());
		requestParams.method   = 'POST'; 
		return FlutterwaveBase.makeRequest('account/pay',  requestParams, callback);
	 }


	 /**
	 * Validate method 2 charge
	 *
	 * @method sendPayment
	 * @param {Object} validateChargeM2Data {otp, transactionreference, merchantid}
	 * @param {Function} callback
	 */
	 this.validateChargeM2 = function (validateChargeM2Data, callback) {
	 	var requestParams      = {};
		validateChargeM2Data.merchantid = FlutterwaveBase.getMerchantKey();
		requestParams.data     = FlutterwaveBase.validateAndEncryptParams(validateChargeM2Data, this.endpointParamSpec('/account/validate/chargeM2'), FlutterwaveBase.getMerchantAPIKey());
		requestParams.method   = 'POST'; 
		return FlutterwaveBase.makeRequest('account/pay/validate',  requestParams, callback);
	 }



	  /**
	 * USSD Validate
	 *
	 * @method sendPayment
	 * @param {Object} validateChargeM2Data {otp, transactionreference, merchantid}
	 * @param {Function} callback
	 */
	 this.validateUSSD = function (USSData, callback) {
	 	var requestParams      = {};
		USSData.merchantid     = FlutterwaveBase.getMerchantKey();
		requestParams.data     = FlutterwaveBase.validateAndEncryptParams(USSData, this.endpointParamSpec('/account/validate/ussd'), FlutterwaveBase.getMerchantAPIKey());
		requestParams.method   = 'POST'; 
		return FlutterwaveBase.makeRequest('accessbank/ussd/validate',  requestParams, callback);
	 }

 
	this.endpointParamSpec = function (path)
	{
		var specs = {};

		specs['/account/chargeM2'] = FlutterwaveBase.objectBuilder({})
						     .build('bankcode', 'required:true, encrypt:true') 
						     .build('narration', 'required:true, encrypt:true')   
						     .build('accountnumber', 'required:true, encrypt:true')  
						     .build('passcode', 'required:true, encrypt:true')  
						     .build('amount', 'required:true, encrypt:true')  
						     .build('currency', 'required:true, encrypt:true')  
						     .build('firstname', 'required:true, encrypt:true')  
						     .build('lastname', 'required:true, encrypt:true')  
						     .build('email', 'required:true, encrypt:true')
						     .build('country', 'required:false, encrypt:true')    
						     .build('transactionreference', 'required:true, encrypt:true')  
						     .build('merchantid', 'required:true, encrypt:false') 
						     .end(); 

		specs['/account/validate/chargeM2'] = FlutterwaveBase.objectBuilder({})
						     .build('otp', 'required:true, encrypt:true')     
						     .build('transactionreference', 'required:true, encrypt:true')  
						     .build('merchantid', 'required:true, encrypt:false') 
						     .end();

		specs['/account/validate/ussd'] = FlutterwaveBase.objectBuilder({})
						     .build('otp', 'required:true, encrypt:true')     
						     .build('phonenumber', 'required:true, encrypt:true')  
						     .build('merchantid', 'required:true, encrypt:false') 
						     .end();  

		specs['/account/resolve'] = FlutterwaveBase.objectBuilder({})
						     .build('destbankcode', 'required:true, encrypt:true') 
						     .build('recipientaccount', 'required:true, encrypt:true')   
						     .build('merchantid', 'required:true, encrypt:false') 
						     .end(); 

		specs['/recurrent/account'] = FlutterwaveBase.objectBuilder({})
						     .build('accountNumber', 'required:true, encrypt:true')  
						     .build('merchantid', 'required:true, encrypt:false') 
						     .end(); 

		specs['/account/validate'] = FlutterwaveBase.objectBuilder({})
						     .build('accountNumber', 'required:true, encrypt:true')
						     .build('otp', 'required:true, encrypt:true')
						     .build('reference', 'required:true, encrypt:true')
						     .build('billingamount', 'required:true, encrypt:true') 
						     .build('debitnarration', 'required:true, encrypt:true') 
						     .build('merchantid', 'required:true, encrypt:false') 
						     .end(); 

		specs['/account/charge'] = FlutterwaveBase.objectBuilder({})
						     .build('accountToken', 'required:true, encrypt:true') 
						     .build('billingamount', 'required:true, encrypt:true') 
						     .build('debitnarration', 'required:true, encrypt:true') 
						     .build('merchantid', 'required:true, encrypt:false') 
						     .end();

		specs['/account/link'] = FlutterwaveBase.objectBuilder({})
							 .build('accountnumber', 'required:true, encrypt:true')
							 .build('merchantid', 'required:true, encrypt:false')
							 .end();

		specs['/account/link/validate'] = FlutterwaveBase.objectBuilder({})
							 .build('otp', 'required:true, encrypt:true')
							 .build('otptype', 'required:true, encrypt:true')
							 .build('relatedreference', 'required:true, encrypt:true')
							 .build('merchantid', 'required:true, encrypt:false')
							 .end();

		specs['/account/link/get'] = FlutterwaveBase.objectBuilder({})
							 .build('merchantid', 'required:true, encrypt:false')
							 .end();

		specs['/account/pay/send'] = FlutterwaveBase.objectBuilder({})
							 .build('accounttoken', 'required:true, encrypt:true')
							 .build('destbankcode', 'required:true, encrypt:true')
							 .build('uniquereference', 'required:true, encrypt:true')
							 .build('country', 'required:true, encrypt:true')
							 .build('currency', 'required:true, encrypt:true')
							 .build('narration', 'required:true, encrypt:true')
							 .build('transferamount', 'required:true, encrypt:true')
							 .build('sendername', 'required:true, encrypt:true')
							 .build('recipientname', 'required:true, encrypt:true')
							 .build('recipientaccount', 'required:true, encrypt:true')
							 .build('merchantid', 'required:true, encrypt:false')
							 .end();


		//Faulty SPECS
		specs['/accessbank/pay'] = FlutterwaveBase.objectBuilder({})
						     .build('accountNumber', 'required:true, encrypt:true')
						     .build('amountToPay', 'required:true, encrypt:true')
						     .build('creditAccountNumber', 'required:true, encrypt:true')
						     .build('trxref', 'required:true, encrypt:true') 
						     .build('narration', 'required:true, encrypt:true') 
						     .build('merchantid', 'required:true, encrypt:false') 
						     .end(); 


		specs['/pay/validate'] = FlutterwaveBase.objectBuilder({})
						     .build('otp', 'required:true, encrypt:true')
						     .build('accountToken', 'required:true, encrypt:true')
						     .build('amountToPay', 'required:true, encrypt:true')
						     .build('trxref', 'required:true, encrypt:true')
						     .build('merchantid', 'required:true, encrypt:false') 
						     .end();


		specs['/pay/resendotp'] = FlutterwaveBase.objectBuilder({}) 
						     .build('validateoption', 'required:true, encrypt:true') 
						     .build('trxref', 'required:false, encrypt:true')
						     .build('merchantid', 'required:true, encrypt:false') 
						     .end();    

		return specs[path];
	} 

}

module.exports = FlutterwaveAccount