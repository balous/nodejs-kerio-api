function lookup_method(method_list, http_client){

	parts = [
		'.',
		'method',
	].concat(method_list)

	source_file = (parts.join('/') + '.js').toLowerCase()

	try {
		method = require(source_file)
	}
	catch(err) {
		if (err.code != 'MODULE_NOT_FOUND') {
			throw err
		}
		method = require('./method.js')
	}

	method.method_list = method_list
	method.http_client = http_client

	return chainable_method(method, false)
}

function chainable_method(target, reset_methods){
	return new Proxy(
		target,
		{
			get: function(target, name) {
				if (name in target) {
					return target[name]
				}

				method_list = []
				if (reset_methods) {
					target.method_list = [name]
				}
				else {
					target.method_list.push(name)
				}

				return lookup_method(target.method_list, target.http_client)
			},
		}
	)
}

module.exports = chainable_method
