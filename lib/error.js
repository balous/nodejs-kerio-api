module.exports = class ApiError extends Error {

	constructor(code, error) {
		super()
		this.error = error
		this.code  = code

		this.message = this.format_message()
	}

	format_message() {
		var msg = "Http code: " + this.code

		if (this.error) {
			msg += ", json-rpc message: " + JSON.stringify(this.error)
		}

		return msg
	}
}
