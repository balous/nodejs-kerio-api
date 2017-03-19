class Client {
	constructor(http_client){
		this.http_client = http_client
		this.method_list = []
	}

	xyz() {
		return this.http_client
	}
}

function chainable_client () {
	HttpClient = require('./http_client.js')
	http_client = new HttpClient(arguments[0])

	chainable_method = require('./chainable_method.js')

	return chainable_method(new Client(http_client), true)
}

module.exports = chainable_client
