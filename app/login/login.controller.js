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
                    var role = loginService.getRole();
                    var error = loginService.getErrorMsg();

                    if (error == "Unauthorized") {
                        $scope.text = "Inloggningen misslyckades!";
                    }
                    else if (role == 'Administrator') {
                        $rootScope.$broadcast("loggedIn");
                        $location.path("/admin");
                        $scope.text="";
                        $scope.login = {};
                    }
                    else if (role == 'Customer') {
                        $rootScope.$broadcast("loggedIn");
                        $location.path("/auction");
                        $scope.text="";
                        $scope.login = {};
                    }
                });
            };
        }]);