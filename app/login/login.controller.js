angular.module("login").
    controller("loginController", ["$scope", "$location", "loginService",
        function ($scope, $location, loginService) {
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
                        loginService.setUserData($scope.user.id,$scope.user.role);
                        $location.path("/adminpage");
                    }
                    else if ($scope.user.role == 'Customer') {
                        loginService.setUserData($scope.user.id, $scope.user.role);
                        $location.path("/auction");
                    }
                    else {

                    }
                });
            };
        }]);