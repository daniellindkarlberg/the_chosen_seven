angular.module("auction").
controller("auctionDetailsController", ["$scope", "$routeParams", "auctionService","supplierService" , 

function($scope, $routeParams, auctionService, supplierService) {
   var auction = {};
   
       auctionService.getAuctionById($routeParams.auctionId).then(function(response) {
        auction = response.data; 
        $scope.auction = auction;

        supplierService.getSupplierById(auction.supplierId).then(function(response) {
        $scope.supplier = response.data;

       

     
    }, function(errorResponse) {
        
    });
      
       

     
    }, function(errorResponse) {
        
    });





 $scope.isCollapsed = true;



    
}]);