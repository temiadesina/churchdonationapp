# Account class Examples
```
//Instantiate the class
var Flutterwave = require('flutterwave');
var flutterwave = new Flutterwave("YOUR_API_KEY","YOUR_MERCHANT_KEY");
```
## Call the Account methods

```
//Initiate (For setting up a bank account for recurrent payment)
flutterwave.Account.initiateRecurrentPayment('4884993849', callback);

//Example success response
{
  "data": {
    "responseCode": "00",
    "responseMessage": "Successful, Pending OTP Validation",
    "transactionReference": "FLWBVN-1452847433079228"
  },
  "status": "success"
}
```

```
//Validate - Usually called after `initiateRecurrentPayment` (For validating a bank account been setup for recurrent payment)
flutterwave.Account.validateRecurrentAccount({ 
  'accountNumber':'8399489',
  'otp':'88839',
  'reference':'FLWBVN-1452847433079228',
  'billingamount':'6500',
  'debitnarration':'SMILE SUBSCRIPTION'
}, callback);

//Example success response
{
  "data": {
    "transactionreference ": "FLWRECUR-135677633",
    "responseCode": "00",
    "accountToken": "qRyPWB60dR63t8XDc97aEg",
    "responseDescription": "Successfully completed"
  },
  "status": "success"
}
```


```
//Charge (For charging a bank account that has been setup for recurrent payment)
flutterwave.Account.chargeRecurrentAccount({
  'accountToken':'qRyPWB60dR63t8XDc97aEg',
  'billingamount':'6500',
  'debitnarration':'SMILE SUBSCRIPTION'
}, callback);

//Example success response
{
  "data": {
    "transactionreference ": "FLWRECUR-135677633",
    "responseCode": "00",
    "responseDescription": "Successfully completed"
  },
  "status": "success"
}
```

```
//LinkAccount (For linking a bank payment account)
flutterwave.Account.linkAccount({
    'accountnumber':'0690000001'
}, callback);

//Example success response
{
 "data": {
    "responsecode": "00",
    "responsemessage": "Successful, Pending OTP Validation",
    "uniquereference": G456789022222
  },
  "status": "success"
}
```

```
// Validate Account Linking (For validating a bank account linking)
flutterwave.Account.validateAccountLinking({
    'otp':'12345',
    'otptype':'PHONE_OTP',
    'relatedreference':'G456789022222'
}, callback);

//Example success response
{
 "data": {
    "responsecode": "00",
    "responsemessage": "Successful, Pending OTP Validation",
    "uniquereference": G456789022222
  },
  "status": "success"
}
```

```
// GetLinkAccount (For fetching a user's linked account)
flutterwave.Account.getLinkedAccounts({}, callback);

//Example success response
{
 "data": {
    "responsecode": "00",
    "responsemessage": "Successful, Pending OTP Validation",
    "uniquereference": G456789022222
  },
  "status": "success"
}
```

```
// Send Payment (To send payment to a bank account)
flutterwave.Account.sendPayment({
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
}, callback);

//Example success response
{
  "data": {
    "responsecode": "00",
    "responsemessage": "Completed Successfully",
    "uniquereference": "0921318712"
  },
  "status": "success"
}

```