var navBar;

app.controller('MainController', function ($scope,$cookies, $route, LoginService) {
    $scope.navBar = {
        src: ""
    };
    navBar = $scope.navBar;
	$scope.currentUser = {};
	$scope.online = true;
	
	$scope.updateOnlineMode = function(){
		$scope.online = !($cookies.get('offline')=="true");
	}
	
    if (!document.cookie) {
        location.href = "/login.html";
    } else {
        $scope.currentUser = {
            email: $cookies.get('email'),
            avatar_url: $cookies.get('avatar_url'),
            nickname: $cookies.get('nickname'),
        };
    }

    $scope.logout = function () {
        LoginService.logout().then(function (res) {
            if (res.data != true) {
                alert("Error");
            } else {
                location.href = "login.html";
            }
        });
    }
	
	$scope.goOffline = function(){
		$cookies.put('offline',true);
		$scope.updateOnlineMode();
		$route.reload();
	}
	
	$scope.goOnline = function(){
		$cookies.remove('offline');
		$scope.updateOnlineMode();
		$route.reload();
	}
	
	$scope.updateOnlineMode();
});
