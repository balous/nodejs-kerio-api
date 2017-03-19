#!/usr/bin/env node

Api = require('kerio-api')

client = Api({debug: true, url: 'https://localhost:4021/admin/api/jsonrpc/', insecure: true})

async = require('async')

async.series([
	function activate(callback){
		client.ProductActivation.activate(
			{
				adminPassword: "password",
				adminLanguage: "en",
				adminEmail: "admin@my.company.net",
				pbxLanguageId: 2,
				pbxStartingNumber: "10",
				timeZoneId: "",
				reboot: false,
				sendClientStatistics: false,
				myKerioEnabled: false,
			},
			(res) => {
				console.log(res);
				callback()
			}
		)
	},
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
