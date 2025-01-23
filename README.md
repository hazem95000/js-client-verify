#### Example

```javascript

	const verify = new JsVerify()

	verify.input('password').required().maxStr(30).minStr(8).pattern(/^[a-zA-Z0-9]+$/)
	verify.input('email').required().email().maxStr(80)
	verify.input('id[]').required().maxNum(100).minNum(2)
	verify.file('image1').fileRequired().fileType(['jpg', 'jpeg']).fileSizeMax(5, 'MB')
	verify.file('image2').fileMimeType(['text/javascript', 'text/html']).fileName(/^[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/)
	verify.data(120).required().maxNum(300).customError('invalid number')

	// Retrieve the error messages in an object.
	console.log(verify.getErrors())

	// Check if the validation is successful or not.
	// Return (true) for success, (false) for failure.
	if (verify.isValid()) {
		console.log('success')
	} else {
		console.log('failure')
	}
```

#### All Methods

(_Data Methods_)

Validate form input by name.
**input('input name')**

Validate input file.
**file('input file name')**

Validate the data from the given value.
**data('value')**

(_Numbers Validation Methods_)

**numbers()**
**digits()**
**digit()**
**integer()**
**natural()**
**whole()**
**decimal()**
**maxNum(100)**
**minNum(15)**

(_Strings Validation Methods_)

**alpha()**
**alphas()**
**alnum()**
**alnums()**
**maxStr(20)**
**minStr(5)**

(_Files Validation Methods_)

**fileRequired()**
**fileName(/^[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/)**
**fileType(['jpg', 'png'])**
**fileMimeType(['text/javascript', 'text/html'])**
**fileSizeMax(5, 'MB')**
**fileSizeMin(2, 'MB')**

(_Other Validation Methods_)

**required()**
**email()**
**ipv4()**
**ipv6()**
**url()**
**dateYMD()** YYYY-MM-DD
**dateMDY()** MM-DD-YYYY
**pattern(/^[a-zA-Z]+$/)**
**customError('custom error message')**

(_Errors and Verify Methods_)

Retrieve the error messages in an object.
**getErrors()**

Check if the validation status
**isValid()**
