/// <reference path="../partials/trailers.html" />
/// <reference path="../partials/trailers.html" />
'use strict';

angular.module('movieLibrary', ['ngDialog', 'ui.sortable', 'movieLibrary.moviedialog'])
.filter('offset', function() {
    return function(input, start) {
        start = parseInt(start, 10);
        return input.slice(start);
    };
})

.controller('HomeController', ['$scope', '$http', 'ngDialog', 'APIService', function ($scope, $http, ngDialog, APIService) {

    $scope.itemsPerPage = 6;
    $scope.currentPage = 0;
    $scope.MovieJson = [];

    $scope.SaveCurrentLibrary = function () {
        localStorage.clear();
        localStorage.setItem('MovieJson', JSON.stringify($scope.MovieJson));
    }

    $scope.pageCount = function () {
        return Math.ceil($scope.MovieJson.length / $scope.itemsPerPage) - 1;
    };

    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pageCount()) {
            $scope.currentPage++;
        }
    }

    $scope.OpenLibrary = function () {
        var MovieJson = JSON.parse(localStorage.getItem('MovieJson'));

        if (MovieJson) {
            $scope.MovieJson = MovieJson;
            console.log('Found Previous Movie');
        }
        else {
            $scope.UpdateMovieLibrary();
        }
        $scope.$broadcast('ImportedMoviesJson', {});
    }

    $scope.UpdateMovieLibrary = function () {
        localStorage.clear();
        console.log('Adding files from library');
        $http.get('./json/movies.json').success(function (json) {
            for (var i = 0; i < json.length; i++) {
                var movie = json[i];
                movie.isUpdated = false;
                $scope.MovieJson.push(movie);
            }
            $scope.$broadcast('ImportedMoviesJson', {});
        });
    }

    $scope.GetMovieInfo = function () {
        var offset = ($scope.currentPage * $scope.itemsPerPage);
        for (var i = offset ; i < offset +  $scope.itemsPerPage; i++) {
            var movie = $scope.MovieJson[i];
            if (!movie.isUpdated) {

                var query = movie.title.replace(/\./g, ' ');

                query = movie.title.replace(/ *\([^)]*\) */g, "");
                query = movie.title.replace(/ *\[[^)]*\] */g, "");

                query = movie.title.replace("Extended", "");
                query = movie.title.replace("extended", "");
                query = movie.title.replace("editions", "");

                var getUrl = APIService.base_uri + 'search/movie' + '?query="' + query + '"&api_key=' + APIService.api_key;

                $http.get(encodeURI(getUrl))
                 .success((function (movie) {
                     return function (data, status, headers, config) {
                         if (data.results.length > 0) {
                             movie.id = data.results[0].id;
                             movie.original_title = data.results[0].original_title;
                             movie.img = 'https://image.tmdb.org/t/p/w130' + data.results[0].poster_path;
                             movie.vote_average = data.results[0].vote_average;
                             movie.backdrop_path = 'https://image.tmdb.org/t/p/w1280' + data.results[0].backdrop_path;
                             movie.isUpdated = true;
                             $scope.SaveCurrentLibrary();
                         }
                         else {
                             //alert('data = ' + data + ' status = ' + status);
                         }
                     }
                 })(movie))

                console.log("Got movie info from tmdb for :" + movie.title);
            }
        }
    }

    $scope.prevPageDisabled = function () {
        return $scope.currentPage === 0 ? "disabled" : "";
    };

    $scope.nextPageDisabled = function () {
        return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
    };

    $scope.Open = function (movie) {
        var scope = $scope.$new();
        scope.movie = movie;
        ngDialog.open({
            template: 'partials/MovieDialog.html',
            scope: scope,
            controller: 'MovieDialogController'
        });
    }

    //Main Program:

    $scope.$on('ImportedMoviesJson', function () {
        console.log('ImportedMoviesJson');
        //$scope.GetMovieInfo();
    });

    $scope.$watch('currentPage', function () {
        $scope.GetMovieInfo();
    });

    $scope.OpenLibrary();
}]);