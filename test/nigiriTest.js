describe('Views', function (){
	var assert = require('assert');

	it ('should render children before parent', function (done){
		var views = require('../lib/nigiri.js')();

		views.define('v1', ['v2'], function (data, children, cb){
			cb(null, 'this is the first and' + children.v2);
		});

		views.define('v2', [], function (data, children, cb){
			cb(null, ' this is the second part');
		});

		views.render('v1', {}, function (err, result){
			assert.ok(result === 'this is the first and this is the second part');
			done();
		});
	});

	it ('should render multiple chidlren before parent', function (done){
		var views = require('../lib/nigiri.js')();

		views.define('v1', ['v2'], function (data, children, cb){
			cb(null, 'this is the first and' + children.v2);
		});

		views.define('v2', ['v3'], function (data, children, cb){
			cb(null, ' this is the second part and ' + children.v3);
		});

		views.define('v3', [], function (data, children, cb){
			cb(null, 'this is the third part');
		});

		views.render('v1', {}, function (err, result){
			assert.ok(result === 'this is the first and this is the second part and this is the third part');
			done();
		});
	});
});