angular.module("app").
    controller("appController", ["$scope", "$rootScope","$location", function ($scope, $rootScope, $location) {
        $scope.myLoggedIn = false;
        $scope.myRole = "notLoggedIn";
        

        $scope.$on("loggedIn", function (event, arg) {
            console.log(arg);
            $scope.myLoggedIn = arg.c;
            $scope.myRole = arg.a;
            $scope.name= arg.b;
        });
        $scope.logOut = function () {
            $scope.myLoggedIn = false;
            $scope.myRole = "notLoggedIn";
            $rootScope.$broadcast("loggedOut");
        };
    }]);