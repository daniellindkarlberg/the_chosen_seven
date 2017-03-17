angular.module("login")
    .factory("loginService", ["$http", function ($http) {
        var isLoggedIn=false;
        var loginId;
        var userRole;
        var name;
        return {
            login: function(obj){
                return $http.post("http://nackademiska-api.azurewebsites.net/api/account/login", obj);         
            },
             setUserData:function(userid, role,firstname,lastname, status){
                loginId=userid;
                userRole=role;
                name=firstname +" " + lastname;
                isLoggedIn=status;
            },
            isLoggedIn: function(){
                return isLoggedIn;
            },
            getName: function(){
                return name;
            },
        };
    }]);