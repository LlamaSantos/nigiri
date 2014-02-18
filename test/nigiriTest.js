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

	it ('should dynamically render a page from defined children', function (done){
		var views = require('../lib/nigiri.js')();

		views.define('w1', [], function (data, children, cb){
			cb(null, 'w1 ' + data.data1);
		});

		views.define('w2', [], function (data, children, cb){
			cb(null, 'w2 ' + data.data2);
		});


		views.dynamic({ data1: 'hello', data2: 'world' }, ['w1', 'w2'], 
			function(err, data, children){
				assert.ok(err === null, 'Error is not null.');
				assert.ok(children.w1 === 'w1 hello', 'w1 sucks');
				assert.ok(children.w2 === 'w2 world', 'w2 sucks');
				done();
			}
		);

	});

	it ('should render nothing when a missing template is supplied', function (done){
		var views = require('../lib/nigiri.js')();

		views.render('tmpl', {}, function (err, result){
			assert.ok(err === 'missing template');
			assert.ok(result === '');
			done();
		});
	});
});