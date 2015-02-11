angular.module('directive', [])

//To use: write bind-img="[itemid]" in your html files.
.directive("bindFrame", function () {
    return {
        restrict: "A",
        transclude: false,
        templateUrl: 'partials/trailers.html',
        link: function (scope, element, attr)
        {            
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

                $('#video').css({ 'width': '640px', 'height': '480px' });
                $('.videoContainer').css({ 'width': '640px', 'height': '480px' });
                $('.ngdialog-content').css({ 'width': '650px', 'height': '490px' });
            }
        }
    };
});