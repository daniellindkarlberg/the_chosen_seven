angular.module("auction").
controller("auctionController", ["$scope", "$location", "auctionService", function($scope, $location, auctionService){
    
    auctionService.getAuctions().then(function(response) {
        var auctions = response.data;
            angular.forEach(auctions, function(auction) {

            });
            $scope.auctions = auctions;
    });


$scope.auctionClicked = function (id) {
        $location.path("/auction/" + id);
    }




}]);