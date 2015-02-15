angular.module('movieLibrary.movieService', [])

.factory('MovieService', ['$rootScope', '$http', function ($rootScope, $http) {
    var MovieInfo = {};

    MovieInfo.SelectedMovie = {};

    return MovieInfo;
}])

.factory('APIService', ['$rootScope', '$http', function ($rootScope, $http) {
    var APIInfo = {};

    APIInfo.api_key = 'e830040a87c1ef71ce545dae4e754307';
    APIInfo.base_uri = "http://api.themoviedb.org/3/";

    return APIInfo;
}])

;