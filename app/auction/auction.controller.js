angular.module("auction").
controller("auctionController", ["$scope", "$location", "auctionService", function($scope, $location, auctionService){

    auctionService.getAuctions().then(function(response) {
        var auctions = response.data;
            angular.forEach(auctions, function(auction) {

            });
            $scope.auctions = auctions;
            // console.log(auctions[0]);
    });

 auctionService.getCategories().then(function(response) {
        var categories = response.data;
        categories.unshift({ name:"Alla kategorier" });
            $scope.categories = categories;
    });

$scope.onCategorySelect = function(categoryId) {
    // console.log("Selected category Id:" + categoryId);
    $scope.selectedCategoryId = categoryId;
};

$scope.auctionClicked = function (id) {
        $location.path("/auction/" + id);
    }

}]);


