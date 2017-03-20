angular.module("admin").controller("adminController", ["$scope", "auctionService", "supplierService", function ($scope, auctionService, supplierService) {

    var completedAuctions;
    var suppliers;
    
    $scope.comepletedAuctions = auctionService.getCompletedAuctions();

    auctionService.getCompletedAuctions().then(function (response) {
        $scope.completedAuctions = response.data;
        completedAuctions = response.data;
        console.log(response.data);
    });

    $scope.suppliers = supplierService.getSuppliers();

    supplierService.getSuppliers().then(function (response) {
        $scope.suppliers = response.data;
        suppliers = response.data;
        console.log(response.data);
    });

angular.forEach(completedAuctions, function(auction) {
    angular.forEach(suppliers, function(supplier){
        if(auction.supplierId == supplier.id){
         auction.supplierName = supplier.name;
         auction.supplierCommission = supplier.commission * auction. 
            }
        });    
    });
}]);


