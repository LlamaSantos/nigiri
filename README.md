nigiri
======

[![Build Status](https://travis-ci.org/LlamaSantos/nigiri.png?branch=master)](https://travis-ci.org/LlamaSantos/nigiri)

Flexible hierarchical rendering engine.

##Usage

```JavaScript
var nigiri = require('nigiri')({ delimeter : '.' });
nigiri.on('feature1.render', function (){
	// React to the rendering
});

nigiri.define('feature1', [/*dependencies here*/], 
	function (data, children, done){
		done(err, "rendered stuff goes here :P");
	}
);

nigiri.define('feature2', ['feature1'], 
	function (data, children, done){
		done(err, "Render Stuff and use stuff from feature1.  Like " + children.feature1);
	}
);

nigiri.render('feature1', {}, function (err, str){
	// Set HTML with str
});
```
