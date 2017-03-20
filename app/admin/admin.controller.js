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
                        console.log(bids[0].bidPrice);
                        auction.highestBid = highestBid.bidPrice;
                        auction.dateOfHighestBid = highestBid.dateTime;
                        console.log("Highest bid: " + auction.highestBid);
                        auction.commission = auction.commissionRate * auction.highestBid;
                        console.log("Commission: " + auction.commission);
                    });
                });
                $scope.completedAuctions = completedAuctions;
                console.log("Commission for completed auction: " + completedAuctions[0].commission);
            });
            });

            /*
            Om högsta priset = acceptpriset så avslutades auktionen på .dateOfHighestBid
            Annars avslutades auktionen på .endTime
            Loopa de avslutade auktionerna
            Kontrollera när varje auktion avslutades.
            Ta fram månaden för avslutningsdatumet month(dateTime)?)

            ng-repeat "month in months"

            */

    }]);