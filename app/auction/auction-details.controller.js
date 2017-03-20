angular.module("auction").
controller("auctionDetailsController", ["$scope", "$routeParams", "auctionService","supplierService" , "loginService",

function($scope, $routeParams, auctionService, supplierService, loginService) {
   var auction = {};
   
       auctionService.getAuctionById($routeParams.auctionId).then(function(response) {
        auction = response.data; 
        $scope.auction = auction;

        supplierService.getSupplierById(auction.supplierId).then(function(response) {
        $scope.supplier = response.data;

       
        auctionService.getAuctionBids(auction.id).then(function(response) {
        $scope.bids = response.data;

        console.log(response.data);

       

     
    }, function(errorResponse) {
        
    });

     
    }, function(errorResponse) {
        
    });
      
       

     
    }, function(errorResponse) {
        
    });


 





 $scope.isCollapsed = true;
  $scope.isCollapsedBid = true;



    
}]);