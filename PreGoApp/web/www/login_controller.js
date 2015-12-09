app.controller('LoginController', function ($scope, LoginService) {
    $scope.email = "";
    $scope.pass = "";
    $scope.login = function () {
        LoginService.login($scope.email, $scope.pass).then(function (res) {
            if (res.data == "") {
                alert("Error");
            } else {
                location.href = "index.html";
            }
        });
    }
});
