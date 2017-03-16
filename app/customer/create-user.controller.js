angular.module("customer").
    controller("createUserController", ["$scope", "$location", "customerService",
        function ($scope, $location, customerService) {

            $scope.createUser = function () {
                var newUser = {
                    firstName: $scope.user.firstname,
                    lastName: $scope.user.lastname,
                    email: $scope.user.email,
                    password: $scope.user.password,
                    phone: $scope.user.phone,
                    address: $scope.user.address,
                    postalCode: $scope.user.postalcode,
                    city: $scope.user.city,
                    role: "Customer",

                };
                customerService.createUser(newUser).then(function () {
                    //$location.path("/user");
                });
            };


        }]);