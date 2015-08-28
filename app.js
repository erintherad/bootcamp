angular.module('bootcamp', ['ngRoute'])

	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider
		.when('/', {
			templateUrl: 'templates/searchGif.html',
			controller: 'MainCtrl'
		});

		$locationProvider.html5Mode( {
			enabled: true,
			requireBase: false
		});
	}])

	.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
		$scope.gifs = [];

		$scope.searchTag = function() {
			var tag = $scope.tag.replace(/\s+/, '');
			var url = 'http://api.giphy.com/v1/gifs/search?q=' + tag + '&api_key=dc6zaTOxFJmzC';
				$http.get(url)
				.then(function(response) {
					$scope.tag = '';
					$scope.gifs = response.data.data;
				});
		};

	}])

	;