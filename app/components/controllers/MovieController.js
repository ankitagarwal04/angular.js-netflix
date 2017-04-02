var app = angular.module("myApp", []);
app.controller("myCtrl", function($scope, $http) {
    $scope.name = "house of cards";
    $scope.name1 = "";
    $scope.actor = "";
    $scope.searchBy = "title";
    $scope.sortBy = ""
    $scope.isArray = null;
    $scope.sortBy = 'show_title';
    $scope.page_number = null;
    $scope.pageArray = [];
    $scope.items_per_page = 3;
    $scope.moviesPerPage = [];
    // calculate nos of pages required based on page size

    $scope.getPageData = function(i) {
        $scope.moviesPerPage = [];
        for (k = (i - 1) * 3; k < i * 3; k++) {
            if (k < $scope.movie_details.length) {
                $scope.moviesPerPage.push($scope.movie_details[k]);
            }
        }
        console.log($scope.moviesPerPage);
    }
    $scope.searchItem = function() {

        $scope.isArray = null;
        $searchvalue = $scope.name.replace(/ /g, "+");
        $http({
                method: "GET",
                url: "https://netflixroulette.net/api/api.php?" + $scope.searchBy + "=" + $searchvalue
            })
            .then(function mySucces(response) {
                if ($scope.searchBy == "title") {
                    $scope.movie_details = response.data;
                    $scope.isArray = false;
                } else {
                    $scope.isArray = true;
                    $scope.pageArray = [];
                    $scope.page_number = null;

                    $scope.movie_details = response.data;
                    console.log($scope.movie_details);
                    console.log(response.data.length);
                    $scope.page_number = Math.ceil(response.data.length / $scope.items_per_page);
                    for (i = 0; i < $scope.page_number; i++) {
                        $scope.pageArray.push(i + 1);

                    }
                    $scope.moviesPerPage = [];
                    for (k = 0; k < 3; k++) {

                        if (k < $scope.movie_details.length) {
                            $scope.moviesPerPage.push($scope.movie_details[k]);
                        }
                    }

                    console.log($scope.page_number);

                    $scope.movie_details = response.data
                }

                /* $scope.movie_details = JSON.parse(response.data);*/
            }, function myError(response) {
                $scope.movie_details = response.data.errorcode;
            });

    }

    /* function for searchByActor*/
    $scope.searchByActor = function(actor) {
        $scope.isArray = null;
        $searchvalue = "";
        $searchvalue = actor.replace(/ /g, "+");


        $http({
            method: "GET",
            url: "https://netflixroulette.net/api/api.php?" + "actor" + "=" + $searchvalue
        }).then(function mySucces(response) {
            $scope.isArray = true;
            $scope.movie_details = response.data;
            $scope.moviesPerPage = [];
            $scope.pageArray = [];
            $scope.page_number = null;

            $scope.page_number = Math.ceil(response.data.length / $scope.items_per_page);
            for (i = 0; i < $scope.page_number; i++) {
                $scope.pageArray.push(i + 1);

            }
            $scope.moviesPerPage = [];
            for (k = 0; k < 3; k++) {
                if (k < $scope.movie_details.length) {
                    $scope.moviesPerPage.push($scope.movie_details[k]);
                }
            }
        })
    }

    /* function for searchByDirector*/
    $scope.searchByDirector = function(director) {
        $scope.isArray = null;
        $searchvalue = "";
        $searchvalue = director.replace(/ /g, "+");

        $http({
            method: "GET",
            url: "https://netflixroulette.net/api/api.php?" + "director" + "=" + $searchvalue
        }).then(function mySucces(response) {
            $scope.isArray = true;
            $scope.movie_details = response.data;
            $scope.moviesPerPage = [];
            $scope.pageArray = [];
            $scope.page_number = null;

            $scope.page_number = Math.ceil(response.data.length / $scope.items_per_page);
            for (i = 0; i < $scope.page_number; i++) {
                $scope.pageArray.push(i + 1);

            }
            $scope.moviesPerPage = [];
            for (k = 0; k < 3; k++) {
                if (k < $scope.movie_details.length) {
                    $scope.moviesPerPage.push($scope.movie_details[k]);
                }
            }

        })
    }

});
app.filter('titlecase', function() {
    return function(input) {
        var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;

        input = input.toLowerCase();
        return input.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title) {
            if (index > 0 && index + match.length !== title.length &&
                match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
                (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
                title.charAt(index - 1).search(/[^\s-]/) < 0) {
                return match.toLowerCase();
            }

            if (match.substr(1).search(/[A-Z]|\../) > -1) {
                return match;
            }

            return match.charAt(0).toUpperCase() + match.substr(1);
        });
    }
});
