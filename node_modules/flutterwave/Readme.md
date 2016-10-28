# Flutterwave Nodejs API Library v1.0.0

## Flutterwave Services exposed by the library

- Account Payment
- BIN Check
- BVN Check
- Card Charge
- Disbursement
- IP Check
- List of banks and financial institutions

For more information on the services listed above, visit the [Flutterwave DEV website](http://www.flutterwave.com/#/api?_k=iqvjlk)

## How to use

`npm install flutterwave`


 You can get your MERCHANT_KEY and API_KEY from the dev dashboard. Go [here](https://www.flutterwavedev.com/signup/) if you don't have an account.

 
```
var Flutterwave = require('flutterwave');

var flutterwave = new Flutterwave(MERCHANT_KEY, API_KEY, BASE_URL_OR_PRODUCTION_FLAG);
```

If you pass true as the value for BASE_URL_OR_PRODUCTION_FLAG, the library will use the production url as the base for all calls. Otherwise it will use any url value you pass as the base. 
If nothing is passed, the default staging url will be use when making the calls.

```
var flutterwave = new Flutterwave('tk_ueiruriruriruriru', 'tk_tueheue'); //Base url is http://staging1flutterwave.co:8080/pwc/rest

var flutterwave = new Flutterwave('tk_ueiruriruriruriru', 'tk_tueheue', true); //Base url is https://prod1flutterwave.co:8181/pwc/rest

var flutterwave = new Flutterwave('tk_ueiruriruriruriru', 'tk_tueheue', "https://someotherurl"); //Base url is https://someotherurl
```

```
/*
To call a flutterwave class (Code-name for API endpoint group) do :
flutterwave.Class.method(param1..paramn, callback);
*/

flutterwave.IP.check('127.0.0.1', function(error, response, body){
	//do stuff with response
})
```

### Callbacks and handling API response

The callback (usually the last argument passed to any of the method calls) takes three parameters:

* `error` : This is usually null unless an error occured.

* `response` : [`http.IncomingMessage`](http://nodejs.org/api/http.html#http_class_http_clientrequest) object. 

* `body` : the response body, [JSend-compliant](https://labs.omniti.com/labs/jsend) ,usually a JSON object in the form:
```
{
	"status" : "success|error",
	"data" : "OBJECT | error message"
}
```

Note that calls to the flutterwave API sometimes return with a successful status even when the request failed. Please check the returned data object and see the responseCode property. Values `0`, `00`, `02` indicate your request was successful. Any other value indicates failure, check the responseMessage to get the failure reason. While a responseCode of `02` indicates a successful request, it also means you need to make a subsequent validation call using information returned from the previous request. To make things a tad simpler, the `response` object has been mutated to include two boolean properties:

* `response.flutterwaveRequestSuccessful` - If true, means the request was 'truly' successful 

* `response.flutterwaveRequestRequiresValidation` - Usually true when the responseCode is `02`

As a rule of thumb, always put your flutterwave calls in a try block. The library throws errors whenever:
* Required params are not passed
* Values are empty
* Values are not in the expected format
_See the [example](https://github.com/Flutterwave/flutterwave-node/tree/master/examples) directory for more usage information_

### Response codes
```
00  Successful
02  Needs card Validation
RR  Transaction Failed. Detailed Message is included in response message
7   Card Declined due to invalid card data
RR-T2   
XS0 Authorization Failed due to connectivity issues with the bank
B02 Invalid BVN
RR-51   Insufficient Funds
RR-R3   CardToken is mandatory!
RR-14   Invalid Card Number
RR-55   Incorrect PIN
R0  Transaction Failed due to connectivity issues with the bank
RR-E42  Card Declined due to invalid card expiry
RR-56   No Card Record
RR-2    Card Declined
RR-X04  Transaction Amount too low
RR-15   Transaction error
RR-7    Card Declined due to invalid card security code
RR-57   Transaction not Permitted to Cardholder
RR-04   Pick-up card
RR-Z8   Payment Gateway currently does not accept your card type
RR-91   Bank or switch network error
EEE An unexpected error occurred!
RR-E18  The service provider is unreachable at the moment, please try again later.
RR-E19  An invalid response was received from remote host, see provider response code/message for details.
RR-E19  An invalid response was received from remote host, please contact system administrator.
RR-E32  JSON is badly formatted or it contains invalid character.
RR-E42  Expiry Date cannot be empty
RR-E57  The PIN contains an invalid character
RR-EE4  Card Details could not be Retrieved!
```
