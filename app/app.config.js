angular.module("app")
.config(["$routeProvider", "$locationProvider", 
function($routeProvider, $locationProvider) {
    $routeProvider
    .when("/", { 
        templateUrl: "app/customer/create-user.template.html",
        controller: "appController"
    })
    .when("/login", {
        templateUrl: "app/login/login.template.html",
        controller: "loginController"
    })
    
    .when("/admin", {
        templateUrl: "app/admin/admin.template.html",
        controller: "adminController"
    })
    .when("/customer", {
        templateUrl: "app/customer/customer.template.html",
        controller: "customerController"
    })
 
  .otherwise("/");
    $locationProvider.html5Mode(true);
}]);