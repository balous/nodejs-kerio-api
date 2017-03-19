
module.exports = class HttpClient {
	constructor() {
		this.debug    = arguments[0].debug
		this.insecure = arguments[0].insecure
		this.url      = require('url').parse(arguments[0].url)
		this.token    = null
		this.cookie   = null
	}

	set_token(token) {
		this.token = token
	}

	headers(){
		var h = {}

		if (this.token) {
			h['X-Token'] = this.token
		}

		if (this.cookie) {
			h['Cookie'] = this.cookie
		}

		return h
	}

	process_json_response(code, headers, resp){

		if (this.debug) {
			console.log(resp)
		}

		var parsed_resp = JSON.parse(resp)
		if ((code != 200) || ('error' in parsed_resp)) {
			var ApiError = require('kerio-api/error.js')
			throw new ApiError(code, parsed_resp['error'])
		}

		if ('set-cookie' in headers) {
			this.cookie = headers['set-cookie'][0]
		}

		return parsed_resp.result
	}

	json_method(name, args, callback) {

		var data = {
			jsonrpc: '2.0',
			id: 1,
			method: name,
			params: args,
		}

		if (this.token) {
			data['token'] = this.token
		}

		var body = JSON.stringify(data)

		var headers = this.headers()
		headers['Accept'] = 'application/json-rpc'
		headers['Content-Length'] = body.length

		if (this.debug) {
			console.log(data)
		}

		var https = require('https')
		var http = require('http')

		var resp_data = ""

		var req = https.request({ 
			host: this.url.hostname, 
			port: this.url.port,
			path: this.url.path,
			method: 'POST',
			rejectUnauthorized: !this.insecure,
			requestCert: true,
			headers: headers,
		},
			(res) => {
				res.setEncoding('utf8');

				res.on('data', (chunk) => {
					resp_data += chunk.toString('utf8')
				})

				res.on('end', () => {
					callback(this.process_json_response(res.statusCode, res.headers, resp_data))
				})
			}
		)

		req.write(body)
		req.end()
	}
}
