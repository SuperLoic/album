(function() {
	var app = angular.module('OTZ', []),
		root = 'http://jsonplaceholder.typicode.com',
		albumUrl = root + '/albums',
		userUrl = root + '/users',
		photosUrl = root + '/photos';

	app.controller('AlbumsCtrl', function($http, $scope, $q){
		var albumsRequest = $http.get(albumUrl),
			userRequest = $http.get(userUrl);

		$scope.loading = true;
		// get data of albums and users from remote server 
		$q.all([albumsRequest, userRequest]).then(function(results){
			var albums = results[0].data || [],
				users = results[1].data || [],
				specificAlbums;

			// assign name to albums
			for (var i = users.length - 1; i >= 0; i--) {
				for (var j = albums.length - 1; j >= 0; j--) {
					if(!albums[j].name || users[i].id == albums[j].userId) {
						albums[j].name = users[i].name;
					}
				};
			};

			$scope.albums = albums;

		}, function (response) {
			alert("Loading failed!");
		}).finally(function() {
			$scope.loading = false;
		});

		$scope.loadAlbum = function(albumId) {
			var specificAlbumUrl = photosUrl + '?albumId=' + albumId;

			$scope.loading = true;
			$http.get(specificAlbumUrl).then(function(response) {
				$scope.currentAlbum = response.data;
			}, function(response) {
				alert("Loading failed!");
			}).finally(function() {
				$scope.loading = false;
			});
		};

		$scope.setCurrentImage = function(url, anchor) {
			$scope.loading = true;
			$scope.currentImage = url;
			$scope.anchor = '#' + anchor;
			$scope.loading = false;
		};
	});

})();
