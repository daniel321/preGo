app.controller('HomeController', function ($scope, HomeService) {

    $scope.users = [];
    //$scope.currentUser.nickname = "Nadie";

    $scope.links = [
        {
            href: "#/chat/Damian",
            text: "Chat con Damian"
        },
        {
            href: "#/chat/Daniel",
            text: "Chat con Daniel"
        },
        {
            href: "#/chat/Nahuel",
            text: "Chat con Nahuel"
        },
        {
            href: "#/chat/Ezequiel",
            text: "Chat con Ezequiel"
        },
        {
            href: "#/chat/Guido",
            text: "Chat con Guido"
        },
        {
            href: "#/chat/Facundo",
            text: "Chat con Facundo"
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
