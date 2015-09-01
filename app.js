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

	.when('/gifs/:id', {
		templateUrl: 'partials/gifShow.html',
		controller: 'GifShowCtrl'
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
	else {
		$scope.listGifs = [{
			title: "Whenever I think about lighting talks.",
			url: "http://media0.giphy.com/media/f35TuXlfi6lMY/200.gif",
			created_at: Date.now()
		},
		{
			title: "After lunch, listening to the lecture.",
			url: "http://media0.giphy.com/media/8onRcRa6d93Ww/200.gif",
			created_at: Date.now()
		},
		{
			title: "When I can't see the screen on the projector.",
			url: "http://media2.giphy.com/media/kBtEWSxpG0s3m/200.gif",
			created_at: Date.now()
		}];
	}

	$scope.deleteGif = function(gif) {
		var index = $scope.listGifs.indexOf(gif);
		$scope.listGifs.splice(index, 1);
	};

}])

.controller('GifShowCtrl', '$http' ['$scope', '$routeParams', function ($scope, $http, $routeParams) {
	var gifId = $routeParams.id;

	$http.get('http://api.giphy.com/v1/gifs/search?q=' + tag + '&api_key=dc6zaTOxFJmzC' + gifId )
	.then(function(response) {
    $scope.gif = response.data;
	});

	$scope.deleteGif = function(gif) {
		var index = $scope.listGifs.indexOf(gif);
		$scope.listGifs.splice(index, 1);
	};

}])


;
