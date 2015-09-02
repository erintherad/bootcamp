angular.module('bootcamp', ['ngRoute', 'ngResource'])

.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$routeProvider

	.when('/', {
		templateUrl: 'views/templates/list.html',
		controller: 'ListCtrl'
	})

	.when('/search', {
		templateUrl: 'views/templates/searchGif.html',
		controller: 'MainCtrl'
	})

	.when('/about', {
		templateUrl: 'views/templates/about.html'
	});

	$locationProvider.html5Mode( {
		enabled: true,
		requireBase: false
	});
}])

.controller('MainCtrl', ['$scope', '$http', '$location', 'Gifs', function($scope, $http, $location, Gifs) {

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
		var toSave = {
			title: title,
			url: gif.images.fixed_height.url,
			date: Date.now()
		};
		Gifs.save(toSave);
	};

}])

.controller('ListCtrl', ['$scope', 'Gifs', function ($scope, Gifs) {

	$scope.gifs = [];
	$scope.gifs = Gifs.query();

	$scope.deleteGif = function(gif) {
		Gifs.remove({id:gif._id});
		var index = $scope.gifs.indexOf(gif);
		$scope.gifs.splice(index, 1);
	};

}])

.service('Gifs', ['$resource', function ($resource) {
	return $resource('/api/gifs/:id', {id: '@_id'}, {
		update: {
			method: 'PUT'
		}
	});
}])


;

// if(localStorage.gifs) {
// 		$scope.listGifs = JSON.parse(localStorage.gifs);
// 	}
// 	else {
// 		$scope.listGifs = [{
// 			title: "Whenever I think about lighting talks.",
// 			url: "http://media0.giphy.com/media/f35TuXlfi6lMY/200.gif",
// 			created_at: Date.now()
// 		},
// 		{
// 			title: "After lunch, listening to the lecture.",
// 			url: "http://media0.giphy.com/media/8onRcRa6d93Ww/200.gif",
// 			created_at: Date.now()
// 		},
// 		{
// 			title: "When I can't see the screen on the projector.",
// 			url: "http://media2.giphy.com/media/kBtEWSxpG0s3m/200.gif",
// 			created_at: Date.now()
// 		}];
// 	}
