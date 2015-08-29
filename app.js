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
	$scope.saveText = "Save this image!";

	$scope.searchGif = function() {
		var tag = $scope.tag.replace(/\s+/, '');
		var url = 'http://api.giphy.com/v1/gifs/search?q=' + tag + '&api_key=dc6zaTOxFJmzC';
		$http.get(url)
		.then(function(response) {
			$scope.tag = '';
			$scope.gifs = response.data.data;
		});
	};

	$scope.saveGif = function(gif) {
		$scope.saveText = "something else";
		if(!localStorage.gifs) {
			localStorage.gifs = JSON.stringify([]);
		}

		var toSave = {
			title: 'sad face',
			url: gif.images.fixed_height.url
		};

		var allGifs = JSON.parse(localStorage.gifs);
		allGifs.push(toSave);

		localStorage.gifs = JSON.stringify(allGifs);
	};

}])

.controller('ListCtrl', ['$scope', function ($scope) {
	if(localStorage.gifs) {
		$scope.listGifs = JSON.parse(localStorage.gifs);
	}
}])


;
