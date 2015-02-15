angular.module('directive', [])

//To use: write bind-img="[itemid]" in your html files.
.directive("bindFrame", function () {

    function link(scope, element, attr)
    {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

            $('#video').css({ 'width': '640px', 'height': '480px' });
            $('.videoContainer').css({ 'width': '640px', 'height': '480px' });
            $('.ngdialog-content').css({ 'width': '650px', 'height': '490px' });
        }
        console.log('Link was called');        

        //$(element).html('<div class="videoContainer"><iframe id="video" ng-src="{{' + scope.src_url + '}}" frameborder="0" allowfullscreen></iframe></div>');
       // $(element).html('<object width="640" height="390"><param name="movie" value="https://www.youtube.com/v/"' + M7lc1UVf-VE?version=3&autoplay=1"></param><param name="allowScriptAccess" value="always"></param><embed src="https://www.youtube.com/v/M7lc1UVf-VE?version=3&autoplay=1" type="application/x-shockwave-flash" allowscriptaccess="always"  width="640" height="390"></embed></object>');
        

        //$(element).find("div").append("<p></p>")
    }

    //function createTemplate(tElement, tAttrs)
    //{        
    //    temp = '<div class="videoContainer"></div>'
    //    console.log('Template was called');
    //    //return temp;
    //}

    return {
        restrict: "E",
        transclude: false,
        templateURL: 'partials/trailers.html',
        link: link
    };
});