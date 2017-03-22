angular.module("admin").controller("adminController", ["$scope", "auctionService", "supplierService",
    function ($scope, auctionService, supplierService) {
        var completedAuctions;
        var suppliers;

        auctionService.getCompletedAuctions().then(function (response) {
            completedAuctions = response.data;

            supplierService.getSuppliers().then(function (response) {
                suppliers = response.data;

                angular.forEach(completedAuctions, function (auction, index) {
                    angular.forEach(suppliers, function (supplier) {
                        if (auction.supplierId == supplier.id) {
                            auction.supplierName = supplier.companyName;
                            auction.commissionRate = supplier.commission;
                        }
                    });

                    auctionService.getAuctionBids(auction.id).then(function (response) {
                        var bids = response.data;
                        var highestBid = bids[bids.length - 1];
                        auction.highestBid = highestBid.bidPrice;
                        auction.dateOfHighestBid = highestBid.dateTime;
                        auction.commission = auction.commissionRate * auction.highestBid;
                        //if(index == completedAuctions.length - 1) {
                        //    $scope.makeSalesMonths();
                        //} 
                    });
               
                });

                $scope.completedAuctions = completedAuctions;

            });

        });

        // Function to run inside the AJAX sequence.
          $scope.makeSalesMonths = function () {
                    // console.log("Starting function makeSalesMonths");

                    angular.forEach(completedAuctions, function (auction) {
                        // console.log(auction);
                        if (auction.highestBid == auction.buyNowPrice) {
                            // console.log("Buy now price was paid");
                            auction.finishedTime = auction.dateOfHighestBid;
                        } else {
                            // console.log("End time was reached");
                            auction.finishedTime = auction.endTime;
                        }
                        // console.log(auction.finishedTime);
                        var finishedDate = new Date(auction.finishedTime);
                        var finishedMonth = finishedDate.getMonth();
                        // console.log("Finished date: " + finishedDate);
                        // console.log("Finished month: " + finishedMonth);
                        auction.finishedMonth = finishedMonth;
                        //console.log("auction.endMonth: " + auction.endMonth);
                    });

                    var salesMonths = [{ name: "Januari" }, { name: "Februari" }, { name: "Mars" }, { name: "April" }, { name: "Maj" }, { name: "Juni" },
                    { name: "Juli" }, { name: "Augusti" }, { name: "September" }, { name: "Oktober" }, { name: "November" }, { name: "December" }];

                    angular.forEach(salesMonths, function (salesMonth, index) {
                        salesMonth.totalSales = 0;
                        salesMonth.totalCommission = 0;
                        angular.forEach(completedAuctions, function (auction,index2) {    
                            // console.log("auction.endMonth: " + auction.endMonth);
                            // console.log("index: " + index);
                            // console.log("auction.finishedMonth: " + auction.finishedMonth);
                            // console.log("auction.commission: " + auction.commission);
                            if (auction.finishedMonth == index) {
                                // console.log("commission to add: " + auction.commission)
                                salesMonth.totalSales += auction.highestBid;
                                salesMonth.totalCommission += auction.commission;
                            };
                        });
                        // console.log("Total sales during month: " + salesMonth.name + " was: " + salesMonth.totalSales);
                        // console.log("Commission during month: " + salesMonth.name + " was: " + salesMonth.totalCommission);
                    });
                    $scope.salesMonths = salesMonths;
                }
    }]);