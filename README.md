# js-client-verify

`js-client-verify` is a JavaScript library designed to facilitate client-side verification tasks, including validating user inputs (such as email, phone numbers, or form fields) and managing secure token-based authentication. 

## Features

- **Input Validation**: Ensure user inputs meet specified criteria (e.g., required fields, string length, patterns).
- **File Validation**: Verify file inputs for type, size, and naming conventions.
- **Custom Error Handling**: Define custom error messages for specific validation rules.

## Installation

To use `js-client-verify` in your project, include the `js-verify.js` script in your HTML file:

```html
<script src="path/to/js-verify.js"></script>
```

Ensure that the path correctly points to the location of `js-verify.js` in your project directory.

## Usage

Create an instance of `JsVerify` and utilize its methods to validate inputs and files:

```javascript
const verify = new JsVerify();

// Validate a password input
verify.input('password').required().minStr(8).maxStr(30).pattern(/^[a-zA-Z0-9]+$/);
// Validate an email input
verify.input('email').required().email().maxStr(80);
// Validate a array input
verify.input('id[]').required().minNum(2).maxNum(100);
// Validate a file input
verify.file('image1').fileRequired().fileType(['jpg', 'jpeg']).fileSizeMax(5, 'MB');

// Retrieve error messages
console.log(verify.getErrors());

// Check if validation is successful
if (verify.isValid()) {
  console.log('successful');
} else {
  console.log('failed');
}
```

## Methods

### General Methods

- `data(value)`: Validates a direct data value.
- `input(inputName)`: Selects the input field by its name attribute.
- `required()`: Ensures the field is not empty.
- `customError(message)`: Sets a custom error message for the current validation chain.
- `getErrors()`: Returns an object containing all error messages.
- `isValid()`: Returns `true` if all validations pass; otherwise, `false`.


### String and Numeric Methods

- `alpha()`: Validates that the input contains only a single alphabetical character (`a-z`, `A-Z`).  
- `alphas()`: Ensures the input contains only alphabetical characters (`a-z`, `A-Z`), allowing spaces.
- `alnum()`: Checks that the input contains an alphanumeric character (letters or digits).  
- `alnums()`: Validates that the input consists of alphanumeric characters (letters and/or digits), allowing spaces.  

- `minStr(length)`: Sets the minimum string length.
- `maxStr(length)`: Sets the maximum string length.

- `numbers()`: Validates that the input is a valid number (integer or decimal).  
- `digits()`: Ensures the input contains only numeric digits (`0-9`).  
- `digit()`: Validates that the input is a single numeric digit (`0-9`).  
- `integer()`: Confirms the input is a whole number (including negatives).  
- `natural()`: Checks that the input is a natural number (positive integer, excluding zero).  
- `whole()`: Validates that the input is a whole number (non-negative integer, including zero).  
- `decimal()`: Ensures the input is a decimal number (may include a fractional part).  

- `minNum(value)`: Sets the minimum numeric value.
- `maxNum(value)`: Sets the maximum numeric value.


### File Methods

- `file(inputName)`: Selects the file input by its name attribute.
- `fileRequired()`: Ensures a file is selected.
- `fileType(types)`: Validates the file extension against an array of allowed types.
- `fileMimeType(mimeTypes)`: Validates the file MIME type against an array of allowed types.
- `fileSizeMax(size, unit)`: Sets the maximum file size (e.g., `5, 'MB'`).
- `fileName(regex)`: Validates the file name against a regular expression.

### Other Methods

- `email()`: Validates the input as a proper email format.
- `pattern(regex)`: Validates the input against a regular expression.
- `ipv4()`: Validates that the input is a valid IPv4 address (e.g., `192.168.1.1`).  
- `ipv6()`: Ensures the input is a valid IPv6 address (e.g., `2001:0db8:85a3:0000:0000:8a2e:0370:7334`).  
- `url()`: Confirms that the input is a properly formatted URL (e.g., `https://example.com`).  
- `dateYMD()`: Validates that the input matches the `YYYY-MM-DD` date format.  
- `dateMDY()`: Ensures the input matches the `MM-DD-YYYY` date format.  

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License.

## Acknowledgments

Special thanks to all contributors and the open-source community for their invaluable support. 