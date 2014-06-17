'use strict';

var app = angular.module('YearbookApp', [
	'infinite-scroll',
	'ngAnimate',
	'ui.router',
	'restangular'
]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider)
{

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('app', {
			abstract: true,
			templateUrl: '../partials/app.html',
			controller: 'AppCtrl'
		})
		.state('app.profiles', {
			url: '/',
			templateUrl: '..//partials/profile/grid.html',
			controller: 'GridCtrl'
		})
		.state('app.profiles.item', {
			url: 'profile/:id',
			templateUrl: '../partials/profile/item.html',
			controller: 'ProfileCtrl'
		});
}]);

app.controller('AppCtrl', ['$scope', function ($scope) {

	var visibles = {};

	$scope.toggle = function(type) {
		visibles[type] = ! visibles[type];
	};

	$scope.visible = function(type) {
		return visibles[type] === true ? true : false;
	};

}]);

app.controller('FilterCtrl', ['$scope', 'Filter', function ($scope, Filter) {

	Filter.fetch().then(function(filters) {
		$scope.filters = filters;
	});

}]);

app.config(['RestangularProvider',function(RestangularProvider) {
	RestangularProvider.setBaseUrl('http://jaaruiting.sintlucas.dev/api/v1/');
	RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {

		var extractedData = data.data;
		if(data.meta)
		{
			extractedData.meta = data.meta;
		}

		return extractedData;
	});
}]);

app.factory('Filter', ['$q', 'Restangular', function ($q, Restangular) {

	return {
		fetch: function() {
			return Restangular.all('filter').getList();
		}
	}
}]);

app.factory('Profile', ['$q', 'Restangular', function ($q, Restangular) {
	var profiles = {};
	var pagination = {
		currentPage: 0,
		totalPages: 1
	};

	var busy = false;

	return {
		busy: function() {
			return busy;
		},
		getTotalPages: function() {
			if(pagination.totalPages) {
				return pagination.totalPages;
			}

			return 1;
		},
		getCurrentPage: function() {
			if(pagination.currentPage) {
				return pagination.currentPage;
			}

			return 1;
		},
		nextPage: function() {
			if(pagination.currentPage < pagination.totalPages)
			{
				return pagination.currentPage + 1;
			}

			return false;
		},
		fetch: function(success, error) {
			if( ! busy) {

				var nextPage = this.nextPage();

				if(nextPage) {
					busy = true;
					return Restangular.all('profile').getList({ page: nextPage}).then(function(response) {
						if(response.meta) {

							pagination.currentPage = response.meta.pagination.current_page;
							pagination.totalPages = response.meta.pagination.total_pages;
						}
						success(response);
						busy = false;
					}, function(response) {
						error(response);
						busy = false;
					});
				}
			}
		},
		find: function(id) {
			var deferred = $q.defer();

			if(profiles[id]) {
				deferred.resolve(profiles[id]);
				return deferred.promise;
			}

			Restangular.one('profile', id).get().then(function(profile) {
				profile.getList('answer').then(function(answers) {
					profile.answers = answers;
				});

				profile.getList('portfolio').then(function(portfolio) {
					profile.portfolio = portfolio;
				});

				profile.getList('network').then(function(network) {
					profile.network = network;
				});

				profile.getList('socialmedia').then(function(socialmedia) {
					profile.socialmedia = socialmedia;
				});

				deferred.resolve(profile);
				profiles[profile.id] = profile;
			});

			return deferred.promise;
		}
	};
}]);

app.controller('GridCtrl', ['$scope', 'Profile', function($scope, Profile) {

	$scope.profiles = [];

	$scope.$parent.profileVisible = true;
	$scope.loadMore = function(profiles) {
		Profile.fetch(function(data) {
			angular.forEach(data, function(item) {
				profiles.push(item);
			});
		});
	}

	$scope.loadMore($scope.profiles);
}]);

app.controller('ProfileCtrl', ['$scope', 'Profile', '$stateParams', function($scope, Profile, $stateParams) {

	var id = $stateParams.id;
	var c = 0;

	function getRandom(items) {
		return items[Math.floor(Math.random() * items.length)];
	}

	Profile.find(id).then(function(profile) {
		$scope.profile = profile;
	});
}]);
