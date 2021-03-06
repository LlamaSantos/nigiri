(function (module, undefined){
	'use strict';

	var EventEmitter2 = require('eventemitter2').EventEmitter2;
	var async = require('async');

	module.exports = function (options){
		options = options || {};
		var views = {};
		var delimeter = options.delimeter || '.';
		var bus = new EventEmitter2({ delimeter : options.delimeter || '.', wildcard : true });

		function render (name, data, done){
			if (name in views){
				var view = views[name];
				async.reduce(view.children, {}, function (memo, child, cb){

					render(child, data, function (err, str){
						memo[child] = str;
						cb(err, memo);
					});

				}, function (err, results){
					views[name].render(data, results, done);
					bus.emit(name + delimeter + 'render');
				});
			}
			else {
				done('missing template', '');
			}
		};

		bus.define = function (name, children, view){
				views[name] = {
					children : children || [],
					render : view
				};
			};

		bus.dynamic = function (data, children, view){
			async.reduce(children, {}, function (memo, child, cb){
				render(child, data, function (err, str){
					memo[child] = str;
					cb(err, memo);
				});
			}, function (err, results){
				view(err, data, results);
				bus.emit('dynamic' + delimeter + 'render');
			});
		};

		bus.render = render;

		return bus;
	};

})(module);