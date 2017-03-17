angular.module("login").
    controller("loginController", ["$scope", "$rootScope", "$location", "loginService",
        function ($scope, $rootScope, $location, loginService) {
            $scope.login = {};

            $scope.getLogin = function (form) {

                var newLogin = {
                    email: $scope.login.email,
                    password: $scope.login.password
                };

                $scope.text = "";

                loginService.login(newLogin).then(function (response) {
                    $scope.user = response.data;
                    if ($scope.user.role == 'Administrator') {
                        loginService.setUserData($scope.user.id, $scope.user.role,$scope.user.firstName,$scope.user.lastName,true);
                        var name = loginService.getName();
                        $rootScope.$broadcast("loggedIn", {a:$scope.user.role, b:name, c:true});
                        $location.path("/admin");
                    }
                    else if ($scope.user.role == 'Customer') {
                        loginService.setUserData($scope.user.id, $scope.user.role, $scope.user.firstName,$scope.user.lastName,true);          
                        var name = loginService.getName();
                        $rootScope.$broadcast("loggedIn", {a:$scope.user.role, b:name, c:true});
                        $location.path("/auction");
                    }
                    else {

                    }
                });
            };
            $scope.$on("loggedOut", function (event, args) {
                loginService.setUserData("", "notLoggedIn", false);
                $scope.login = {};
            });
        }]);