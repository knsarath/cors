/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var myapp = angular.module('myApp',['ngRoute','http-auth-interceptor'])
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }])
     .factory('featuresData', function ($http) {
        return{          
            doCrossDomainGet: function(data) {
                return $http({
                    url:'http://Default-Environment-8tpprium54.elasticbeanstalk.com/api/login',
                     type: "POST",
        crossDomain: true,
        data: JSON.stringify({"username":"test_teacher" , "password":"123"}),
        contentType:  'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            console.log(response);


        },
        error: function (xhr, status) {
            alert("error");
        }
                })
            }        
        }
});



function getLocalToken() {
   return sessionStorage["authToken"];
}

function setLocalToken(value) {
    sessionStorage["authToken"] = value;
}

function getHttpConfig() {
    return {
        headers: {
            'X-Auth-Token': getLocalToken()
        }
    };
}

function getAuthenticateHttpConfig() {
    return {
        ignoreAuthModule: true
    };
}


myapp.controller('loginController',['$scope','$http','authService','featuresData',function($scope,$http,authService,featuresData){
   
             
         $scope.auth = function(){
            console.log(featuresData.doCrossDomainGet($scope.fields))
            } 
    
}]);


