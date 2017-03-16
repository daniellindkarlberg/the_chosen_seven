angular.module("login")
    .factory("loginService", ["$http", function ($http) {
        var isLoggedIn=false;
        var loginId;
        var userRole;
        return {
            login: function(obj){
                return $http.post("http://nackademiska-api.azurewebsites.net/api/account/login", obj);         
            },
             setUserData:function(userid, role){
                loginId=userid;
                userRole=role;
                isLoggedIn=true;
            },
            isLoggedIn: function(){
                return isLoggedIn;
            },
        };
    }]);