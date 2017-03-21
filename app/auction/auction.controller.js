angular.module("auction").
    controller("auctionController", ["$scope", "$location", "auctionService","$filter",function ($scope, $location, auctionService, $filter) {

        auctionService.getAuctions().then(function (response) {
            var auctions = response.data;
              
            angular.forEach(auctions, function (auction) {
            auction.highestBid = 0;

                auctionService.getAuctionBids(auction.id).then(function (response) {
                     
                    var bids = response.data;
                    if (!bids.length == 0){

                        auction.highestBid = bids[bids.length - 1].bidPrice;
                        


                    }


                });

            });

            $scope.auctions = auctions;
        });



        function activeAuctionsFilter(auctionsInput) {
            var a = [];
              console.log(auctionsInput);

            angular.forEach(auctionsInput, function (auction) {
               

                if (auction.buyNowPrice == 18000 ) {
                   
                   
                    a.push(auction);
                    



                }
            });

            return a;


        };







        auctionService.getCategories().then(function (response) {
            var categories = response.data;
            categories.unshift({ name: "Alla kategorier" });
            $scope.categories = categories;
        });

        $scope.onCategorySelect = function (categoryId) {
            // console.log("Selected category Id:" + categoryId);
            $scope.selectedCategoryId = categoryId;
        };

        $scope.auctionClicked = function (id) {
            $location.path("/auction/" + id);
        }





    }]);


