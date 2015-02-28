angular.module('movieLibrary.moviedialog', ['ngDialog', 'directive', 'movieLibrary.services', 'youtube-embed'])

.controller('MovieDialogController', ['$scope', '$http', 'ngDialog', 'APIService', 'MovieService', 'UserService', function ($scope, $http, ngDialog, APIService, MovieService, UserService) {
    //$scope.movie = {}; Pass in movie from higher up caller;

    var getUrl = APIService.base_uri + 'movie/' + $scope.movie.id + '?api_key=' + APIService.api_key;

    $http.get(encodeURI(getUrl)).success(function (data) {
        $scope.movie.overview = data.overview;

        $(function () {
            $("h2").wrapInner("<span>");

            $("h2 br")
                .before("<span class='spacer'>")
                .after("<span class='spacer'>");
        });
    });

    $scope.AddToWatchList = function()
    {
        UserService.GetWatchList();
    }

    $scope.Open = function (movie) {
        ngDialog.close('ngDialog1');
        ngDialog.open({
            template: 'partials/trailers.html',
            plain: false,
            className: 'ngdialog-theme-flat',
            controller: ['$scope', '$sce','APIService', function ($scope, $sce, APIService) {
                $scope.theBestVideo = 'sMKoNBRZM1M';

                var getUrl = APIService.base_uri + 'movie/' + movie.id + '/trailers?api_key=' + APIService.api_key;

                $http.get(encodeURI(getUrl)).success(function (data) {
                    $scope.theBestVideo = data.youtube[0].source;
                });
            }]
        });
    }
}]);