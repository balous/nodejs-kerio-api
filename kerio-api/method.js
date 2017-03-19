function Method() {
	name = this.method_list.join('.')
	return this.http_client.json_method(name, arguments[0], arguments[1])
}

module.exports = Method
