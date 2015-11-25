app.controller('MainController', function ($scope) {
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
