angular.module("auction").
controller("auctionDetailsController", ["$scope", "$routeParams", "auctionService", 
function($scope, $routeParams, auctionService) {
    auctionService.getAuctionById($routeParams.auctionId).then(function(response) {
        $scope.auction = response.data;

     
    }, function(errorResponse) {
        
    });
}]);