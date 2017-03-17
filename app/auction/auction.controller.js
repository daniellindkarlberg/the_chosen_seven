angular.module("auction").
controller("auctionController", ["$scope", "$location", "auctionService", function($scope, $location, auctionService){
    
$scope.products = productService.getProducts();

    auctionService.getAuctions().then(function(response) {
        var auctions = response.data;
            angular.forEach(auctions, function(auction) {

            });
            $scope.auctions = auctions;
    });
} ]);