angular.module("auction").
controller("auctionController", ["$scope", "$location", "auctionService", function($scope, $location, auctionService){
    
$scope.products = productService.getProducts();

    auctionService.getAuctions().then(function(response) {
        var auctions = response.data;
            angular.forEach(auctions, function(auction) {

            });
            $scope.auctions = auctions;
    });


 auctionService.getCategories().then(function(response) {
        var categories = response.data;
        
        categories.unshift({ name:"Alla kategorier" });
            console.log(categories);
            $scope.categories = categories;
    });


$scope.auctionClicked = function (id) {
        $location.path("/auction/" + id);

        console.log(id);
    }

}]);


