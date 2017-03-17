angular.module("admin")
.factory("adminService", ["$http", function($http) {
    var suppliers = [];

    return {
       
        getSuppliers: function(id) {
            return $http.get("http://nackademiska-api.azurewebsites.net/api/supplier");
        },

          getClosedAuctions: function() {
            return $http.get("http://nackademiska-api.azurewebsites.net/api/auction/completed");
        }
        
    };
}]);