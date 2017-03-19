#!/usr/bin/env node

Api = require('kerio-api')

client = Api({debug: true, url: 'https://localhost:4040/admin/api/jsonrpc', insecure: true})

async = require('async')

async.series([
/*	function init_set_hostname(callback){
		client.Init.setHostname(
			{hostname: 'host-name'},
			(res) => {
				console.log(res);
				callback()
			}
		)
	},
	function init_create_primary_domain(callback){
		client.Init.createPrimaryDomain(
			{domainName: 'domain.com'},
			(res) => {
				console.log(res);
				callback()
			}
		)
	},
	function init_create_admin_account(callback){
		client.Init.createAdministratorAccount(
			{loginName: 'Admin', password: 'password'},
			function(res){
				console.log(res)
				callback()
			}
		)
	},
	function init_finish(callback){
		client.Init.finish(
			{},
			function(res){
				console.log(res)
				callback()
			}
		)
	},*/
	function login(callback) {
		client.Session.login (
			{userName: 'Admin', password: 'password', application: {'name': "", 'vendor': "", 'version': ""}},
			function(res){
				console.log(res);
				callback()
			}
		)
	},
	function logout(callback){
		client.Session.logout(
			{},
			function (res){
				console.log(res); callback()
			}
		)
	},
])
