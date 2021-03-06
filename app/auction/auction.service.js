angular.module("auction")
    .factory("auctionService", ["$http", function ($http) {
        

        return {
            getAuctions: function () {
                return $http.get("http://nackademiska-api.azurewebsites.net/api/auction");
            },
            getAuctionById: function (id) {
                return $http.get("http://nackademiska-api.azurewebsites.net/api/auction/" + id);
            },

            getCompletedAuctions: function () {
                return $http.get("http://nackademiska-api.azurewebsites.net/api/auction/completed");
            },

            getAuctionBids: function (id) {
                return $http.get("http://nackademiska-api.azurewebsites.net/api/bid/" + id);
            },

            getCategories: function () {
                return $http.get("http://nackademiska-api.azurewebsites.net/api/category");
            },
            placeBid: function (bid) {
                return $http.post("http://nackademiska-api.azurewebsites.net/api/bid", bid);
            },




        };
    }]);