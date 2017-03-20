angular.module("admin").controller("adminController", ["$scope", "auctionService", "supplierService",
    function ($scope, auctionService, supplierService) {
    var completedAuctions;
    var suppliers;

    auctionService.getCompletedAuctions().then(function (response) {
        $scope.completedAuctions = response.data;
        completedAuctions = response.data;
        console.log("First completed auction id: " + completedAuctions[0].id);

        supplierService.getSuppliers().then(function (response) {
            $scope.suppliers = response.data;
            suppliers = response.data;
            console.log("First supplier name: " + suppliers[0].companyName);

            angular.forEach(completedAuctions, function(auction) {
                angular.forEach(suppliers, function(supplier){
                    if(auction.supplierId == supplier.id){
                        auction.supplierName = supplier.companyName;
                        console.log("Supplier name: " + auction.supplierName);
                        auction.commissionRate = supplier.commission;
                        console.log("Supplier commission rate: " + auction.commissionRate);
                    }
                })

                console.log("Auction id for bids: " + auction.id);
                auctionService.getAuctionBids(auction.id).then(function (response) {
                    var bids = response.data;
                    console.log(bids[0].bidPrice);
                    auction.highestBid = bids[bids.length-1].bidPrice;
                    console.log("Highest bid: " + auction.highestBid);
                    auction.commission = auction.commissionRate * auction.highestBid;
                    console.log("Commission: " + auction.commission);
                });
            });
        });
    });

    }]);



