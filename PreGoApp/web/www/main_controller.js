var navBar;

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

app.controller('MainController', function ($scope, LoginService) {
    $scope.navBar = {
        src: ""
    };
    navBar = $scope.navBar;

    if (!document.cookie) {
        location.href = "/login.html";
    } else {
        $scope.currentUser = {
            email: readCookie('email'),
            avatar_url: readCookie('avatar_url'),
            nickname: readCookie('nickname'),
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
