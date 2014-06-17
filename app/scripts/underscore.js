'use strict';

var app = angular.module('underscore', []);

app.factory('_', [function() {
	return window._;
}]);
