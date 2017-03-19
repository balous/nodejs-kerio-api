function Method() {
	name = this.method_list.join('.')
	resp = this.http_client.json_method(
		name,
		arguments[0],
		(resp) => {
			this.http_client.set_token(resp.token)

			arguments[1](resp)
		}
	)
}

module.exports = Method
