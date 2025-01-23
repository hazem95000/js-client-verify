class JsVerify
{
	constructor () 
	{
		this.errors = {}
		this.files = null
		this.value  = null
		this.inputName  = null

		this.messages = {
			'required': 'is required',

			'alpha': 'must contain english letters only',
			'alphas': 'must contain english letters and spaces',	
			'alnum': 'must contain english letters and digits',
			'alnums': 'must contain english letters, digits and spaces',

			'numbers': 'must contain numbers only',
			'digits': 'must contain positive digits',
			'digit': 'only digits from 0 to 9 are allowed',
			'integer': 'must contain integers',
			'decimal': 'must contain decimal number',
			'natural': 'must contain natural numbers',
			'whole': 'must contain whole numbers',

			'invalid': 'has an invalid format',

            'maxStr': 'maximum number of charaters must be',
            'minStr': 'minimum number of charaters must be',
            'maxNum': 'maximum number must be',
            'minNum': 'minimum number must be',

            'fileRequired': 'file is required',
            'fileName': 'file name has invalid format',
            'fileType': 'has an invalid type',
            'fileMimeType': 'has an invalid MIME type',
            'fileSizeMax': 'maximum allowed file size is',
            'fileSizeMin': 'minimum allowed file size is',
		}

        this.regex = {
        	'numbers': /^-?\d+(\.\d+)?$/, // any positive, negative or fractions (-1,0,1,2,3.5) 
            'digits': /^[0-9]+$/, // (0,1,2,3,4,59 ..)
            'digit': /^[0-9]$/, // (from 0 to 9)

            // Integer numbers (Z) = (-1,0,1,2,3 ..)
            'integer': /^\-?[0-9]+$/,

            // Decimal numbers (-1, 0, 1, 2, 3.5, +21 ..)
            'decimal': /^[+-]?\d+(\.\d+)?$/,

		 	// Natural / Counting numbers (N) = (1,2,3,4,5 ..)
            'natural': /^[1-9][0-9]*$/,

            // Whole numbers (W) = (0,1,2,3,4 ..)
            'whole': /^[0-9]+$/,

            'email': /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
            'alpha': /^[a-zA-Z]+$/i, // en letters
            'alphas': /^[A-Za-z ]*$/, // en letters and spaces
            'alnum': /^[a-z0-9]+$/i, // en letters, numbers
            'alnums': /^[A-Za-z0-9 ]*$/, // en letters, numbers, spaces        
            'ipv4': /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
            'ipv6': /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::(?:[0-9a-fA-F]{1,4}:){0,6}[0-9a-fA-F]{1,4}$|^(?:[0-9a-fA-F]{1,4}:){1,7}:$/,
            'url': /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
            'date_ymd': /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, // YYYY-MM-DD
            'date_mdy': /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-(\d{4})$/ // MM-DD-YYYY
        }
	}

	input (val)
	{
		this.inputName = val

		if (document.getElementsByName(val)[0] !== undefined)
		{
			if (document.getElementsByName(val)[0].getAttribute('type') !== 'file') 
			{
				if (document.getElementsByName(val).length > 1) 
				{
					let array = [] 
					let node  = document.getElementsByName(val)

					node.forEach(function(item){
						array.push(item.value.toString())
					})

					this.value = array
				}
				else if (document.getElementsByName(val)[0]) 
				{
					this.value = document.getElementsByName(val)[0].value.toString()
				}
			}
			else
			{
				throw "JsVerify: undefined input name ("+this.inputName+")"
				return false
			}
		}
		else
		{
			throw "JsVerify: undefined input name ("+this.inputName+")"
			return false
		}

		if (this.value.length == 0 || this.value == null || this.value == '') {
			this.value = null
		}

		return this
	}

	data (val) 
	{
		this.inputName = 'error'

		if (val == '' || val == null || val.length == 0) {
			this.value = null
		} else {
			this.value = val.toString()
		}

		return this
	}

	file (val) 
	{
		this.inputName = val

		if (document.getElementsByName(this.inputName)[0] !== undefined)
		{
			if (document.getElementsByName(this.inputName)[0].getAttribute('type') === 'file') 
			{
				if (document.getElementsByName(this.inputName)[0].files.length > 0) 
				{
					this.files = document.getElementsByName(this.inputName)[0].files
				}
				else
				{
					this.files = null
				}
			}
			else 
			{
				throw "JsVerify: undefined file name ("+this.inputName+")"
				return false
			}
		}
		else 
		{
			throw "JsVerify: undefined file name ("+this.inputName+")"
			return false
		}

		return this
	}

	fileRequired () 
	{
		if (this.files == null) {
			this.err(this.messages.fileRequired)
		}

		return this
	}

	fileType (arrayTypes)
	{
		if (!Array.isArray(arrayTypes)) {
			throw "JsVerify: the fileType() function accepts an array parameter."
		}

		if (this.files !== null) 
		{
			for (let f = 0; f <= this.files.length-1; f++) 
			{
				let type = this.files[f].name.split('.')
				type = type[type.length-1]
				
				if (!arrayTypes.includes(type)) {
					this.err(this.messages.fileType)
				}
			}
		}

		return this
	}

	fileMimeType (mimeTypes)
	{
		if (!Array.isArray(mimeTypes)) {
			throw "JsVerify: the fileMimeType() function accepts an array parameter."
		}

		if (this.files !== null)
		{
			for (let f = 0; f <= this.files.length-1; f++) 
			{
				let type = this.files[f].type

				if (!mimeTypes.includes(type)) {
					this.err(this.messages.fileMimeType)
				}
			}
		}

		return this
	}

	fileName (pattern)
	{
		if (!pattern instanceof RegExp) {
			throw "JsVerify: the fileMimeType() function accepts a regular expression."
		}

		if (this.files !== null)
		{
			for (let f = 0; f <= this.files.length-1; f++) 
			{
				let name = this.files[f].name

				if (!pattern.test(name)) {
					this.err(this.messages.fileName)
				}
			}
		}

		return this
	}

	fileSizeMax (sizeLimit, sizeUnit)
	{
		if (this.files !== null) 
		{
			for (let f = 0; f <= this.files.length-1; f++) 
			{
				let file = this.fileSizeFormat(this.files[f].size)
				file = file.split(' ', 2)

				let size = file[0]
				let unit = file[1]

				if (size > sizeLimit && unit == sizeUnit) {
					this.err(this.messages.fileSizeMax+' '+sizeLimit+' '+sizeUnit)
				}
			}
		}

		return this
	}

	fileSizeMin (sizeLimit, sizeUnit)
	{
		if (this.files !== null) 
		{
			for (let f = 0; f <= this.files.length-1; f++) 
			{
				let file = this.fileSizeFormat(this.files[f].size)
				file = file.split(' ', 2)

				let size = file[0]
				let unit = file[1]

				if (size < sizeLimit && unit == sizeUnit) {
					this.err(this.messages.fileSizeMin+' '+sizeLimit+' '+sizeUnit)
				}
			}
		}

		return this
	}

	fileSizeFormat (bytes) 
	{
		if (bytes >= 1073741824) { // 1 GB = 1,073,741,824 bytes
			return (bytes / 1073741824).toFixed(2) + ' GB';
		} else if (bytes >= 1048576) { // 1 MB = 1,048,576 bytes
			return (bytes / 1048576).toFixed(2) + ' MB';
		} else if (bytes >= 1024) { // 1 KB = 1,024 bytes
			return (bytes / 1024).toFixed(2) + ' KB';
		} else {
			return bytes + ' bytes';
		}
	}

	required ()
	{
		if (this.value == null) 
		{
			this.err('is required')
		} 
		else 
		{
			if (Array.isArray(this.value)) 
			{
				for (let data in this.value) 
				{
					if (this.value[data].length == 0) 
					{
						this.err(this.messages.required)
					}
				}
			}
		}

		return this
	}

	alpha ()
	{
		if (this.value !== null) 
		{
			if (Array.isArray(this.value)) 
			{
				for (let data in this.value) 
				{
					if (!this.regex.alpha.test(this.value[data])) 
					{
						this.err(this.messages.alpha)
					}
				}
			} 
			else 
			{
				if (!this.regex.alpha.test(this.value)) 
				{
					this.err(this.messages.alpha)
				}
			}
		}

		return this
	}

	alphas ()
	{
		if (this.value !== null) 
		{
			if (Array.isArray(this.value)) 
			{
				for (let data in this.value) 
				{
					if (!this.regex.alphas.test(this.value[data])) 
					{
						this.err(this.messages.alphas)
					}
				}
			} 
			else 
			{
				if (!this.regex.alphas.test(this.value)) 
				{
					this.err(this.messages.alphas)
				}
			}
		}

		return this
	}

	alnum ()
	{
		if (this.value !== null) 
		{
			if (Array.isArray(this.value)) 
			{
				for (let data in this.value) 
				{
					if (!this.regex.alnum.test(this.value[data])) 
					{
						this.err(this.messages.alnum)
					}
				}
			} 
			else 
			{
				if (!this.regex.alnum.test(this.value)) 
				{
					this.err(this.messages.alnum)
				}
			}
		}

		return this
	}

	alnums ()
	{
		if (this.value !== null) 
		{
			if (Array.isArray(this.value)) 
			{
				for (let data in this.value) 
				{
					if (!this.regex.alnums.test(this.value[data])) 
					{
						this.err(this.messages.alnums)
					}
				}
			} 
			else 
			{
				if (!this.regex.alnums.test(this.value)) 
				{
					this.err(this.messages.alnums)
				}
			}
		}

		return this
	}

	numbers ()
	{
		if (this.value !== null) 
		{
			if (Array.isArray(this.value)) 
			{
				for (let data in this.value) 
				{
					if (!this.regex.numbers.test(this.value[data])) 
					{
						this.err(this.messages.numbers)
					}
				}
			} 
			else 
			{
				if (!this.regex.numbers.test(this.value)) 
				{
					this.err(this.messages.numbers)
				}
			}
		}

		return this
	}

	digits ()
	{
		if (this.value !== null) 
		{
			if (Array.isArray(this.value)) 
			{
				for (let data in this.value) 
				{
					if (!this.regex.digits.test(this.value[data])) 
					{
						this.err(this.messages.digits)
					}
				}
			} 
			else 
			{
				if (!this.regex.digits.test(this.value)) 
				{
					this.err(this.messages.digits)
				}
			}
		}

		return this
	}

	digit ()
	{
		if (this.value !== null) 
		{
			if (Array.isArray(this.value)) 
			{
				for (let data in this.value) 
				{
					if (!this.regex.digit.test(this.value[data])) 
					{
						this.err(this.messages.digit)
					}
				}
			} 
			else
			{
				if (!this.regex.digit.test(this.value)) 
				{
					this.err(this.messages.digit)
				}
			}
		}

		return this
	}	

	integer ()
	{
		if (this.value !== null) 
		{
			if (Array.isArray(this.value)) 
			{
				for (let data in this.value) 
				{
					if (!this.regex.integer.test(this.value[data])) 
					{
						this.err(this.messages.integer)
					}
				}
			}
			else 
			{
				if (!this.regex.integer.test(this.value)) 
				{
					this.err(this.messages.integer)
				}
			}
		}

		return this
	}	

	decimal ()
	{
		if (this.value !== null) 
		{
			if (Array.isArray(this.value)) 
			{
				for (let data in this.value) 
				{
					if (!this.regex.decimal.test(this.value[data])) 
					{
						this.err(this.messages.decimal)
					}
				}
			}
			else 
			{
				if (!this.regex.decimal.test(this.value)) 
				{
					this.err(this.messages.decimal)
				}
			}
		}

		return this
	}	

	natural ()
	{
		if (this.value !== null) 
		{
			if (Array.isArray(this.value)) 
			{
				for (let data in this.value) 
				{
					if (!this.regex.natural.test(this.value[data])) 
					{
						this.err(this.messages.natural)
					}
				}
			}
			else 
			{
				if (!this.regex.natural.test(this.value)) 
				{
					this.err(this.messages.natural)
				}
			}
		}

		return this
	}

	whole ()
	{
		if (this.value !== null) 
		{
			if (Array.isArray(this.value)) 
			{
				for (let data in this.value) 
				{
					if (!this.regex.whole.test(this.value[data])) 
					{
						this.err(this.messages.whole)
					}
				}
			}
			else 
			{
				if (!this.regex.whole.test(this.value)) 
				{
					this.err(this.messages.whole)
				}
			}
		}

		return this
	}	

	email ()
	{
		if (this.value !== null) 
		{
			if (Array.isArray(this.value)) 
			{
				for (let data in this.value) 
				{
					if (!this.regex.email.test(this.value[data])) 
					{
						this.err(this.messages.invalid)
					}
				}
			} 
			else 
			{
				if (!this.regex.email.test(this.value)) 
				{
					this.err(this.messages.invalid)
				}
			}
		}

		return this
	}

	ipv4 ()
	{
		if (this.value !== null) 
		{
			if (Array.isArray(this.value)) 
			{
				for (let data in this.value) 
				{
					if (!this.regex.ipv4.test(this.value[data])) 
					{
						this.err(this.messages.invalid)
					}
				}
			} 
			else 
			{
				if (!this.regex.ipv4.test(this.value)) 
				{
					this.err(this.messages.invalid)
				}
			}
		}

		return this
	}

	ipv6 ()
	{
		if (this.value !== null) 
		{
			if (Array.isArray(this.value)) 
			{
				for (let data in this.value) 
				{
					if (!this.regex.ipv6.test(this.value[data])) 
					{
						this.err(this.messages.invalid)
					}
				}
			} 
			else 
			{
				if (!this.regex.ipv6.test(this.value)) 
				{
					this.err(this.messages.invalid)
				}
			}
		}

		return this
	}

	url ()
	{
		if (this.value !== null) 
		{
			if (Array.isArray(this.value)) 
			{
				for (let data in this.value) 
				{
					if (!this.regex.url.test(this.value[data])) 
					{
						this.err(this.messages.invalid)
					}
				}
			} 
			else 
			{
				if (!this.regex.url.test(this.value)) 
				{
					this.err(this.messages.invalid)
				}
			}
		}

		return this
	}

	dateYMD ()
	{
		if (this.value !== null) 
		{
			if (Array.isArray(this.value)) 
			{
				for (let data in this.value) 
				{
					if (!this.regex.date_ymd.test(this.value[data])) 
					{
						this.err(this.messages.invalid)
					}
				}
			} 
			else 
			{
				if (!this.regex.date_ymd.test(this.value)) 
				{
					this.err(this.messages.invalid)
				}
			}
		}

		return this
	}

	dateMDY ()
	{
		if (this.value !== null) 
		{
			if (Array.isArray(this.value)) 
			{
				for (let data in this.value) 
				{
					if (!this.regex.date_mdy.test(this.value[data])) 
					{
						this.err(this.messages.invalid)
					}
				}
			} 
			else 
			{
				if (!this.regex.date_mdy.test(this.value)) 
				{
					this.err(this.messages.invalid)
				}
			}
		}

		return this
	}

	maxStr (max)
	{
		if (this.value !== null) 
		{
			if (Array.isArray(this.value)) 
			{
				for (let data in this.value) 
				{
					if (this.value[data].length > max) 
					{
						this.err(this.messages.maxStr+' '+max)
					}
				}
			} 
			else 
			{
				if (this.value.length > max) 
				{
					this.err(this.messages.maxStr+' '+max)
				}
			}
		}

		return this
	}

	minStr (min)
	{
		if (this.value !== null) 
		{
			if (Array.isArray(this.value)) 
			{
				for (let data in this.value) 
				{
					if (this.value[data].length < min) 
					{
						this.err(this.messages.minStr+' '+min)
					}
				}
			} 
			else 
			{
				if (this.value.length < min) 
				{
					this.err(this.messages.minStr+' '+min)
				}
			}
		}

		return this
	}

	maxNum (max)
	{
		if (this.value !== null) 
		{
			if (Array.isArray(this.value)) 
			{
				for (let data in this.value) 
				{
					if (!this.regex.numbers.test(this.value[data])) 
					{
						this.err(this.messages.maxNum+' '+max)
					}
					else if (this.value[data] > max) 
					{
						this.err(this.messages.maxNum+' '+max)
					}
				}
			} 
			else 
			{
				if (!this.regex.numbers.test(this.value)) 
				{
					this.err(this.messages.maxNum+' '+max)
				}
				else if (this.value > max) 
				{
					this.err(this.messages.maxNum+' '+max)
				}
			}
		}

		return this
	}

	minNum (min)
	{
		if (this.value !== null) 
		{
			if (Array.isArray(this.value)) 
			{
				for (let data in this.value) 
				{
					if (!this.regex.numbers.test(this.value[data])) 
					{
						this.err(this.messages.minNum+' '+min)
					}
					else if (this.value[data] < min) 
					{
						this.err(this.messages.minNum+' '+min)
					}
				}
			} 
			else 
			{
				if (!this.regex.numbers.test(this.value)) 
				{
					this.err(this.messages.minNum+' '+min)
				}
				else if (this.value < min) 
				{
					this.err(this.messages.minNum+' '+min)
				}
			}
		}

		return this
	}

	pattern (regex)
	{
		if (this.value !== null) 
		{
			if (Array.isArray(this.value))
			{
				for (let data in this.value) 
				{
					if (!regex.test(this.value[data])) 
					{
						this.err(this.messages.invalid)
					}
				}
			} 
			else 
			{
				if (!regex.test(this.value)) 
				{
					this.err(this.messages.invalid)
				}
			}
		}

		return this
	}

	err (value) 
	{
		this.inputName = this.inputName.toString()

		if (this.inputName == '' || this.inputName == null) {
			this.inputName = 'error'
		}

		this.errors[this.inputName.replace('[]', '')] = value
	}

	getErrors ()
	{
		return this.errors
	}

	isValid ()
	{
		if (Object.keys(this.errors).length === 0) {
			return true
		} else {
			return false
		}
	}

	// Custom error message
	customError (msg) 
	{
		if (this.errors.hasOwnProperty(this.inputName) && this.errors[this.inputName] !== undefined) 
		{
			this.errors[this.inputName] = msg.toString()
		}
	}
}