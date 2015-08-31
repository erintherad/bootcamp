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
	// $scope.class = "hidden";

	// if ($scope.class === "hidden")
 //        $scope.class = "block";
 //    else 
 //        $scope.class = "hidden";
 //    if ($scope.block === "block")
 //        $scope.block = "hidden";
 //    else
 //        $scope.block = "block";

	$scope.gifs = [];

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
