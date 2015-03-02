angular.module('movieLibrary.services', [])

.factory('MovieService', ['$rootScope', '$http', function ($rootScope, $http) {
    var MovieInfo = {};

    MovieInfo.SelectedMovie = {};

    return MovieInfo;
}])

.factory('APIService', ['$http', function ($http) {
    var APIInfo = {};

    APIInfo.api_key = 'e830040a87c1ef71ce545dae4e754307';
    APIInfo.base_uri = "http://api.themoviedb.org/3/";

    return APIInfo;
}])

.factory('DBService', ['$http','$rootScope', function ($http, $rootScope) {
    var APIInfo = {};

    APIInfo.api_key = 'e830040a87c1ef71ce545dae4e754307';
    APIInfo.base_uri = "http://moviestochoose.netau.net/api/";

    APIInfo.AddUser = function ()
    {
        var getUrl = APIInfo.base_uri + 'User/AddUser.php?user=' + 'ming' + '&pass=' + '123';
            $http.get(encodeURI(getUrl)).success(function (data) {
        });
    }

    APIInfo.GetWatchListURI = function (username)
    {
        return APIInfo.base_uri + 'User/GetWatchlist.php?user=' + username;
    }

    return APIInfo;
}])

.factory('UserService', ['$http', '$rootScope', 'DBService', function ($http, $rootScope, DBService) {
    var UserInfo = {};

    UserInfo.username = 'Admin';
    UserInfo.password = "1234";

    UserInfo.Watchlist = [];

    UserInfo.AddUser = function () {
        //TODO:
        //var getUrl = APIInfo.base_uri + 'User/AddUser.php?user=' + 'ming' + '&pass=' + '123';
        //    $http.get(encodeURI(getUrl)).success(function (data) {
        //});
    }

    UserInfo.LoadWatchList = function ()
    {
        var getUrl = DBService.GetWatchListURI(UserInfo.username);

        $http.get(encodeURI(getUrl)).success(function (data) {
            console.log('Got user watchlist.');
            UserInfo.Watchlist = data.data;
            $rootScope.$broadcast('LoadedWatchList', {});
        });
    }

    UserInfo.LoadWatchList();
    return UserInfo;
}])

.filter('filterByArray', function () {
    return function (arrayToFilter, arrayToInclude) {
        if (arrayToInclude.length == 0) {
            return arrayToFilter;
        }
        return arrayToFilter.filter(function (element, index, array) {
            return !(arrayToInclude.indexOf(element.id)<0);
        });
    };
})

;