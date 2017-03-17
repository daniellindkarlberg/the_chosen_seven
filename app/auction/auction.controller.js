angular.module("auction").
controller("auctionController", ["$scope", "$location", "auctionService", function($scope, $location, auctionService){
    
    auctionService.getAuctions().then(function(response) {
        var auctions = response.data;
            angular.forEach(auctions, function(auction) {

            });
            $scope.auctions = auctions;
    });

<<<<<<< HEAD

$scope.auctionClicked = function (id) {
        $location.path("/auction/" + id);
    }




}]);
=======
    auctionService.getCategories().then(function(response) {
        var categories = response.data;
        
        categories.unshift({ name:"Alla kategorier" });
            console.log(categories);
            $scope.categories = categories;
    });

    
} ]);
>>>>>>> a38ea31416cf23447b0f25831aec8a95516f7c2d
