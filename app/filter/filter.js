angular.module("filter")
    .filter("activeAuctionsFilter", ["$http", function ($http) {

        return function (input) {
            var ret = [];
            //var date=new Date();
            angular.forEach(input, function (o) {
                if (o.fromDate > new Date() && o.toDate < new Date()) {
                    ret.push(o);
                    console.log(o);
                }
            });
            return ret;
        };


    }]);