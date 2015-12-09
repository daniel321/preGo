var navBar;
app.controller('MainController', function ($scope, LoginService) {
    $scope.navBar = {
        src: ""
    };
    navBar = $scope.navBar;

    if (!document.cookie) {
        document.cookie = "nickname=Nadie";
        $scope.currentUser = {
            nickname: 'Nadie'
        };
    } else {
        $scope.currentUser = {
            nickname: document.cookie.split("=")[1]
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
