angular.module("admin").
controller("adminController", ["$scope", function($scope, adminService){

    adminService.getClosedAuctions().then(function(response){
                    $scope.closedAuctions = response.data;
                    console.log(response.data);
});
} ]);