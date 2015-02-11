/// <reference path="../partials/trailers.html" />
/// <reference path="../partials/trailers.html" />
'use strict';

angular.module('movieLibrary', ['ngDialog', 'directive'])


.controller('HomeController', ['$scope', '$http', 'ngDialog', '$rootScope', function ($scope, $http, ngDialog, $rootScope) {

    $scope.api_key = 'e830040a87c1ef71ce545dae4e754307';
    $scope.base_uri = "http://api.themoviedb.org/3/";

    $scope.MovieJson = [];

    $scope.SaveCurrentLibrary = function ()
    {
        localStorage.clear();
        localStorage.setItem('MovieJson', JSON.stringify($scope.MovieJson));
    }

    $scope.OpenLibrary = function ()
    {
        var MovieJson = JSON.parse(localStorage.getItem('MovieJson'));

        if (MovieJson) {
            $scope.MovieJson = MovieJson;
            console.log('Found Previous Movie');
        }
        else {
            $scope.UpdateMovieLibrary();
        }
    }

    $scope.$on('done', function () {
        console.log('done');
    });


    $scope.UpdateMovieLibrary = function ()
    {
        localStorage.clear();
        console.log('Adding files from library');
        $http.get('./json/movies.json').success(function (json) {
            for (var i = 0; i < json.length; i++) {
                $scope.MovieJson.push(json[i]);
            }
            $rootScope.$broadcast('done', {});
        });
    }

    $scope.GetMovieInfo = function ()
    {
        for (var i = 0; i < 5/*$scope.MovieJson.length*/; i++)
        {
            var movie = $scope.MovieJson[i];
            var query = movie.title.replace(/\./g, ' ');

            query = movie.title.replace(/ *\([^)]*\) */g, "");
            query = movie.title.replace(/ *\[[^)]*\] */g, "");

            query = movie.title.replace("Extended", "");
            query = movie.title.replace("extended", "");
            query = movie.title.replace("editions", "");

            var getUrl = $scope.base_uri + 'search/movie' +'?query="' + query + '"&api_key=' + $scope.api_key;

            $http.get(encodeURI(getUrl))
             .success((function (movie) {
                 return function (data, status, headers, config) {
                     if (data.results.length > 0) {
                         movie.id = data.results[0].id;
                         movie.original_title = data.results[0].original_title;
                         movie.img = 'https://image.tmdb.org/t/p/w130' + data.results[0].poster_path;
                         movie.vote_average = data.results[0].vote_average;
                         movie.backdrop_path = 'https://image.tmdb.org/t/p/w1280' + data.results[0].backdrop_path;

                         $scope.SaveCurrentLibrary();
                     }
                     else
                     {
                         //alert('data = ' + data + ' status = ' + status);
                     }
                }
             })(movie))
        }
    }

    $scope.Open = function(movie)
    {
        ngDialog.open({
            template: 'partials/MovieDialog.html',
            controller: ['$scope', '$http', 'ngDialog', function ($scope, $http, ngDialog) {
                $scope.movie = movie;

                $scope.api_key = 'e830040a87c1ef71ce545dae4e754307';
                $scope.base_uri = "http://api.themoviedb.org/3/";

                var getUrl = $scope.base_uri + 'movie/' + movie.id + '?api_key=' + $scope.api_key;

                $http.get(encodeURI(getUrl)).success(function (data) {
                    $scope.movie.overview = data.overview;

                    $(function () {
                        $("h2")
                            .wrapInner("<span>")

                        $("h2 br")
                            .before("<span class='spacer'>")
                            .after("<span class='spacer'>");

                    });
                });

                $scope.Open = function ()
                {
                    ngDialog.close('ngDialog1');
                    ngDialog.open({
                        template: '<div bind-frame=""></div>',
                        plain: true,
                        className: 'ngdialog-theme-flat',
                        controller: ['$scope', '$sce', function ($scope, $sce) {
                            $scope.movie = movie;

                            $scope.api_key = 'e830040a87c1ef71ce545dae4e754307';
                            $scope.base_uri = "http://api.themoviedb.org/3/";

                            var getUrl = $scope.base_uri + 'movie/' + movie.id + '/trailers?api_key=' + $scope.api_key;
                            
                            $http.get(encodeURI(getUrl)).success(function (data) {
                                $scope.src_url = "https://www.youtube.com/embed/" + data.youtube[0].source + "?rel=0&amp;autoplay=1&amp;showinfo=0&amp;vq=hd1080";
                                $scope.src_url = $sce.trustAsResourceUrl($scope.src_url);
                            });
                        }]
                    });
                }

            }]
        });
    }



    //Main Program:

    $scope.OpenLibrary();
}]);