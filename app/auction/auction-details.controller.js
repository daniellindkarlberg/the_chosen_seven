angular.module("auction").
    controller("auctionDetailsController", ["$scope", "$routeParams", "auctionService", "supplierService", "loginService", "$timeout", "$location",

        function ($scope, $routeParams, auctionService, supplierService, loginService, $timeout, $location) {
            var auction = {};
            var customerId = loginService.getCustomerId();
            $scope.bid = {};



            auctionService.getAuctionById($routeParams.auctionId).then(function (response) {
                auction = response.data;
                $scope.auction = auction;

                supplierService.getSupplierById(auction.supplierId).then(function (response) {

                    $scope.supplier = response.data;


                    auctionService.getAuctionBids(auction.id).then(function (response) {

                        bids = response.data
                        if(!bids.length == 0){
                        var highestBid = bids[bids.length - 1];
                        $scope.highestBid = highestBid.bidPrice;
                        $scope.bids = response.data;
                        }

                    }, function (errorResponse) {

                    });


                }, function (errorResponse) {

                });
            }, function (errorResponse) {

            });


            $scope.updateBidHistory = function () {
                $timeout(function () {
                    auctionService.getAuctionBids(auction.id).then(function (response) {

                        $scope.bids = response.data;

                        console.log(response.data);
                    }, function (errorResponse) {

                    });

                }, 300);

            }



            $scope.buyNowClicked = function (response) {
                if (!loginService.isLoggedIn()) {

                    $location.path('/login');
                }
                else {
                    var bid = auction.buyNowPrice;
                    console.log(bid);
                    var bidObject = {
                        auctionId: auction.id,
                        customerId: customerId,
                        bidPrice: bid
                    };

                    auctionService.placeBid(bidObject).then(function (response) {

                        $scope.text = "Grattis till inlöpet";


                    }, function (errorResponse) {

                    });

                }
            }


            $scope.bidClicked = function (response) {
                if (!loginService.isLoggedIn()) {

                    $location.path('/login');
                }
                else {
                    var bid = $scope.bid.placeBid;
                    var bidObject = {
                        auctionId: auction.id,
                        customerId: customerId,
                        bidPrice: bid
                    };

                    auctionService.placeBid(bidObject).then(function (response) {

                        $scope.text = "Bud lagt!"
                    }, function (errorResponse) {

                    });

                }

            }
            $scope.isCollapsed = true;
            $scope.isCollapsedBid = true;

        }]);