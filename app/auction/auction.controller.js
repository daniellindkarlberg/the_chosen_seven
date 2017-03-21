angular.module("auction").
    controller("auctionController", ["$scope", "$location", "auctionService", function ($scope, $location, auctionService) {





        auctionService.getAuctions().then(function (response) {
            var auctions = response.data;

            angular.forEach(auctions, function (auction) {
                       
                       
                auctionService.getAuctionBids(auction.id).then(function (response) {
                 
                    var bids = response.data;
                    if(!bids.length == 0 && bids[0].auctionId == auction.id){
                    
               

                        auction.highestBid = bids[bids.length - 1].bidPrice;
                          // console.log(auction.highestBid);

                    }
                    
                
                });

            });





            $scope.auctions = activeAuctionsFilter(auctions);
        });

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


        function activeAuctionsFilter (auctionsInput) {
            var a = [];
            //console.log(auctionsInput);
            
            angular.forEach(auctionsInput, function (auction) {
           
                if (auction.buyNowPrice != auction.highestBid) {
                    a.push(auction);
                  //  console.log(auction.buyNowPrice);
                    

                   
                }
            });
            //console.log(auctions);
            return a;

           
        };


    }]);


