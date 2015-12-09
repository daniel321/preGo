app.controller('HomeController', function ($scope, HomeService) {

    $scope.users = [];

    $scope.links = [
        {
            href: "#/chat/Daniel",
            text: "Chat con Daniel"
        }
    ];

    $scope.login = function (user) {
        HomeService.login(user.email,user.pass).then(function (res) {
            $scope.currentUser.nickname = user.nickname;
        });
    }

    HomeService.getUsers().then(function (res) {
        angular.copy(res, $scope.users);
    });

});
