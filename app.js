angular.module('bootcamp', ['ngRoute'])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider

	.when('/', {
		templateUrl: 'templates/list.html',
		controller: 'ListCtrl'
	})

	.when('/search', {
		templateUrl: 'templates/searchGif.html',
		controller: 'MainCtrl'
	})

	.when('/about', {
		templateUrl: 'templates/about.html'
	});

	$locationProvider.html5Mode( {
		enabled: true,
		requireBase: false
	});
}])

.controller('MainCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {

	$scope.gifs = [];
	$scope.title = '';

	$scope.searchGif = function() {
		var tag = $scope.tag.replace(/\s+/, '');
		var url = 'http://api.giphy.com/v1/gifs/search?q=' + tag + '&api_key=dc6zaTOxFJmzC';
		$http.get(url)
		.then(function(response) {
			$scope.tag = '';
			$scope.gifs = response.data.data;
		});
	};

	$scope.saveGif = function(gif, title) {
		if(!localStorage.gifs) {
			localStorage.gifs = JSON.stringify([]);
		}

		var toSave = {
			title: title,
			url: gif.images.fixed_height.url,
			created_at: Date.now()
		};

		var allGifs = JSON.parse(localStorage.gifs);
		allGifs.unshift(toSave);

		localStorage.gifs = JSON.stringify(allGifs);
	};

}])

.controller('ListCtrl', ['$scope', function ($scope) {
	if(localStorage.gifs) {
		$scope.listGifs = JSON.parse(localStorage.gifs);
	}

	$scope.deleteGif = function(gif) {
		var index = $scope.listGifs.indexOf(gif);
		$scope.listGifs.splice(index, 1);
	}

}])


;
