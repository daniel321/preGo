var navBar;
app.controller('MainController', function ($scope) {
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
});
