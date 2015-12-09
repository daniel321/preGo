app.controller('RegisterController', function ($scope, RegisterService) {
    $scope.nickname = "";
    $scope.email = "";
    $scope.pass = "";
    $scope.verifyPass = "";
    $scope.acceptsTerms = true;
    $scope.validate = function () {
        if ($scope.nickname == "" || $scope.email == "" || $scope.pass == "" || $scope.verifyPass == "") {
            alert("Campo vacío");
            return false;
        }
        if (typeof($scope.email) === 'undefined' || $scope.email.indexOf("@") == -1) {
            alert("Email incorrecto");
            return false;
        }
        if ($scope.pass != $scope.verifyPass) {
            alert("Contraseña incorrecta");
            return false;
        }
        if (!$scope.acceptsTerms) {
            alert("Debe aceptar los términos");
            return false;
        }
        return true;
    }
    $scope.register = function () {
        if ($scope.validate()) {
            var user = {
                nickname: $scope.nickname,
                email: $scope.email,
                pass: $scope.pass
            }
            RegisterService.register(user).then(function (res) {
                if (res.data != true) {
                    alert("Error interno");
                } else {
                    location.href = "login.html";
                }
            });
        }
    }
});
