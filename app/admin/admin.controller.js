angular.module("admin").controller("adminController", ["$scope", "auctionService", "supplierService",
    function ($scope, auctionService, supplierService) {
        var completedAuctions;
        var suppliers;

        auctionService.getCompletedAuctions().then(function (response) {
            completedAuctions = response.data;
            // console.log("First completed auction id: " + completedAuctions[0].id);

            supplierService.getSuppliers().then(function (response) {
                suppliers = response.data;
                // console.log("First supplier name: " + suppliers[0].companyName);

                angular.forEach(completedAuctions, function (auction, index) {
                    angular.forEach(suppliers, function (supplier) {
                        if (auction.supplierId == supplier.id) {
                            auction.supplierName = supplier.companyName;
                            // console.log("Supplier name: " + auction.supplierName);
                            auction.commissionRate = supplier.commission;
                            // console.log("Supplier commission rate: " + auction.commissionRate);
                        }
                    });

                    // console.log("Auction id for bids: " + auction.id);
                    auctionService.getAuctionBids(auction.id).then(function (response) {
                        var bids = response.data;
                        var highestBid = bids[bids.length - 1];
                        // console.log(highestBid);
                        auction.highestBid = highestBid.bidPrice;
                        auction.dateOfHighestBid = highestBid.dateTime;
                        // console.log("Highest bid: " + auction.highestBid);
                        auction.commission = auction.commissionRate * auction.highestBid;
                        // console.log("Commission: " + auction.commission);
                        console.log(index);
                        if(index == completedAuctions.length - 1) {
                             $scope.makeSalesMonths();
                        }
                        
                    });
               
                });

                

                // console.log("Commission for completed auction: " + completedAuctions[0].commission);

                $scope.completedAuctions = completedAuctions;

            });
        });

        // Function to run inside the AJAX sequence.
          $scope.makeSalesMonths = function () {
                    console.log("Starting function makeSalesMonths");

                    angular.forEach(completedAuctions, function (auction) {
                        console.log(auction);
                        if (auction.highestBid == auction.buyNowPrice) {
                            auction.finishedTime = auction.dateOfHighestBid;
                        } else {
                            auction.finishedTime = auction.endTime;
                        }
                        // console.log(auction.finishedTime);
                        var finishedDate = new Date(auction.finishedTime);
                        var finishedMonth = finishedDate.getMonth();
                        // console.log("Finished date: " + finishedDate);
                        // console.log("Finished month: " + finishedMonth);
                        auction.endMonth = new Date(auction.finishedTime);
                        //console.log("auction.endMonth: " + auction.endMonth);
                    });

                    var salesMonths = [{ name: "Januari" }, { name: "Februari" }, { name: "Mars" }, { name: "April" }, { name: "Maj" }, { name: "Juni" },
                    { name: "Juli" }, { name: "Augusti" }, { name: "September" }, { name: "Oktober" }, { name: "November" }, { name: "December" }];

                    console.log("Name of first month: " + salesMonths[0].name);

                    angular.forEach(salesMonths, function (salesMonth, index) {
                        salesMonth.sales = 0;
                        angular.forEach(completedAuctions, function (auction) {
                            // console.log("auction.endMonth: " + auction.endMonth);
                            // console.log("index: " + index);
                            // console.log("auction.highestBid: " + auction.highestBid);
                            if (auction.endMonth == index) {
                                salesMonth.sales += auction.highestBid;
                            };
                        });
                        console.log("Sales during month: " + salesMonth.name + " was: " + salesMonth.sales);
                    });
                    $scope.salesMonths = salesMonths;
                }
    }]);