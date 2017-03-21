angular.module("auction")
  .filter("auctionTimeFilter", ["$filter", function ($filter) {
       return function (ongoingAuctions) {
           var ret = [];

           angular.forEach(ongoingAuctions, function (auction) {
               if(new Date($filter('date')(auction.startTime)) <= new Date() && new Date($filter('date')(auction.endTime)) >= new Date() &&
                   auction.highestBid != auction.buyNowPrice) {
                 
                   ret.push(auction);
               } else {
                
               }
           });
           return ret;
       };
   }]);