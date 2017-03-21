angular.module("admin").controller("adminController",  ["$scope",  "auctionService",  "supplierService",
    function  ($scope,  auctionService,  supplierService)  {
            var  completedAuctions;
            var  suppliers;

            auctionService.getCompletedAuctions().then(function  (response)  {
                    completedAuctions  =  response.data;
                    console.log("First completed auction id: " + completedAuctions[0].id);

            supplierService.getSuppliers().then(function  (response)  {
                suppliers  =  response.data;
                console.log("First supplier name: " + suppliers[0].companyName);

                angular.forEach(completedAuctions,  function (auction)  {
                    angular.forEach(suppliers,  function (supplier) {
                        if (auction.supplierId  ==  supplier.id) {
                            auction.supplierName  =  supplier.companyName;
                            console.log("Supplier name: " + auction.supplierName);
                            auction.commissionRate  =  supplier.commission;
                            console.log("Supplier commission rate: " + auction.commissionRate);
                        }
                    })

                    console.log("Auction id for bids: " + auction.id);
                    auctionService.getAuctionBids(auction.id).then(function (response) {
                        var bids = response.data;
                        var highestBid = bids[bids.length - 1];
                        console.log(highestBid);
                        auction.highestBid = highestBid.bidPrice;
                        auction.dateOfHighestBid = highestBid.dateTime;
                        console.log("Highest bid: " + auction.highestBid);
                        auction.commission = auction.commissionRate * auction.highestBid;
                        console.log("Commission: " + auction.commission);
                    });
                });

                console.log("Commission for completed auction: " + completedAuctions[0].commission);

                angular.forEach(completedAuctions, function(auction) {
                    if(auction.highestBid == auction.buyNowPrice) {
                        auction.finishedTime = auction.dateOfHighestBid;
                    } else {
                        auction.finishedTime = auction.endTime;
                    }
                    console.log(auction.finishedTime);
                    auction.endMonth =  auction.finishedTime.getMonth();
                });

                var salesMonths = {"01": "Januari", "02": "Februari", "03": "Mars", "04": "April", "05": "Maj", "06": "Juni",
                    "07": "Juli", "08": "Augusti", "09": "September", "10": "Oktober", "11": "November", "12": "December"};
                
                angular.forEach(salesMonths, function(salesMonth, index) {
                    salesMonth.sales = 0;
                    angular.forEach(completedAuctions, function(auction) {
                        if(auction.endMonth = index) {
                            salesMonth.sales += auction.highestBid;
                        };
                    });
                    console.log("Sales during month: " + index + "was: " + salesmonth.sales);
                });

                $scope.completedAuctions = completedAuctions;
                $scope.salesMonths = salesMonths;

            });
            });
    }]);