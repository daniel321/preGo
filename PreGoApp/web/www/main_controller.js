var navBar;

app.controller('MainController', function ($scope,$cookies, LoginService) {
    $scope.navBar = {
        src: ""
    };
    navBar = $scope.navBar;
	$scope.currentUser = {};
	
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
});
