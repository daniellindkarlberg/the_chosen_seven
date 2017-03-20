angular.module("app").
    controller("appController", ["$scope", "$rootScope", "$location","loginService", function ($scope, $rootScope, $location,loginService) {
        $scope.myLoggedIn = false;
        $scope.myRole = "notLoggedIn";

        $scope.$on("loggedIn", function (event, arg) {
            console.log(arg);
            $scope.myLoggedIn = true;
            $scope.name=loginService.getName();
            $scope.myRole = loginService.getRole();
        });
        $scope.logOut = function () {
            $scope.myLoggedIn = false;
            $scope.myRole = "notLoggedIn";
            $scope.name="";
        };
    }]);