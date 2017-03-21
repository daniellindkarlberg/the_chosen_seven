angular.module("filter")
    .filter("activeAuctionsFilter", ["$http", function ($http) {

        return function (input) {
            var ret = [];
            //var date=new Date();
            angular.forEach(input, function (auction) {
                if (auction.startTime > new Date() && auction.endTime < new Date() && auction.highestBid != auction.buyNowPrice) {
                    ret.push(o);
                    console.log(o);
                }
            });
            return ret;
        };


    }]);