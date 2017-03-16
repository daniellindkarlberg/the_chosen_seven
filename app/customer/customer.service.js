angular.module("customer")
.factory("customerService", ["$http", function($http) {
    var customers = [];

    return {
       
        getCustomerById: function(id) {
            return $http.get("http://nackademiska-api.azurewebsites.net/api/customer/" + id);
        },
        
    };
}]);