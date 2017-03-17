angular.module("app")
.config(["$routeProvider", "$locationProvider", 
function($routeProvider, $locationProvider) {
    $routeProvider
    .when("/", { 
        templateUrl: "app/auction/auction-list.template.html",
        controller: "appController"
    })
    .when("/login", {
        templateUrl: "app/login/login.template.html",
        controller: "loginController"
    })
     .when("/signup", {
        templateUrl: "app/customer/create-user.template.html",
        controller: "customerController"
    })
    
    .when("/admin", {
        templateUrl: "app/admin/admin.template.html",
        controller: "adminController"
    })
    .when("/customer", {
        templateUrl: "app/customer/customer.template.html",
        controller: "customerController"
    })


    .when("/auction/:auctionId",{
        templateUrl: "app/auction/auction-details.template.html",
        controller: "auctionDetailsController"
    })

    .when("/supplier/:supplierId",{
        templateUrl: "app/supplier/supplier-details.template.html",
        controller: "supplierDetailsController"
    })
  .otherwise("/");
    $locationProvider.html5Mode(true);
}]);