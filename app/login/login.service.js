angular.module("login")
    .factory("loginService", ["$http", function ($http) {
        var isLoggedIn = false;
        var customerId;
        var firstName;
        var lastName;
        var email;
        var phone;
        var address;
        var postalCode;
        var city;
        var role;
        var fullName;
        var errorMessage = "";

        return {
            login: function (obj) {
                return $http.post("http://nackademiska-api.azurewebsites.net/api/account/login", obj)
                    .then(function (response) {
                        isLoggedIn = true;
                        customerId = response.data.id;
                        firstName = response.data.firstName;
                        lastName = response.data.lastName;
                        email = response.data.email;
                        phone = response.data.phone;
                        address = response.data.address;
                        postalCode = response.data.postalCode;
                        city = response.data.city;
                        role = response.data.role;
                        fullName = firstName + " " + lastName;
                        errorMessage = "";
                    }, function (error) {
                        if (error.status == -1) {
                            errorMessage = "Unauthorized";
                        }
                    });
            },
            isLoggedIn: function () {
                return isLoggedIn;
            },
            getCustomerId: function () {
                return customerId;
            },
            logOut: function () {
                isLoggedIn = false;
                errorMessage = "";
            },
            getErrorMsg: function () {
                return errorMessage;
            },
            getUser: function () {
                return customerId;
            },
            getName: function () {
                return fullName;
            },
            getRole: function () {
                return role;
            }
        };
    }]);

