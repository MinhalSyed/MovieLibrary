angular.module('movieLibrary.services', [])

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

.factory('DBService', ['$http', function ($http) {
    var APIInfo = {};

    APIInfo.api_key = 'e830040a87c1ef71ce545dae4e754307';
    APIInfo.base_uri = "http://moviestochoose.netau.net/api/";

    APIInfo.AddUser = function ()
    {
        var getUrl = APIInfo.base_uri + 'User/AddUser.php?user=' + 'ming' + '&pass=' + '123';
            $http.get(encodeURI(getUrl)).success(function (data) {
        });
    }

    APIInfo.GetWatchlist = function(username)
    {
        var getUrl = APIInfo.base_uri + 'User/GetWatchlist.php?user=' + username;
        $http.get(encodeURI(getUrl)).success(function (data) {
            console.log(data.data);
        });
    }

    return APIInfo;
}])

.factory('UserService', ['$http', 'DBService', function ($http, DBService) {
    var UserInfo = {};

    UserInfo.username = 'Admin';
    UserInfo.password = "1234";

    UserInfo.AddUser = function () {
        //TODO:
        //var getUrl = APIInfo.base_uri + 'User/AddUser.php?user=' + 'ming' + '&pass=' + '123';
        //    $http.get(encodeURI(getUrl)).success(function (data) {
        //});
    }

    UserInfo.GetWatchList = function ()
    {
        DBService.GetWatchlist(UserInfo.username);
    }

    return UserInfo;
}])

;