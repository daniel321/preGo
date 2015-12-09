app.factory('LoginService', function ($http, $q) {
    return {
        login: function (email, pass) {
            return $http({
                url: '/api/login',
                method: 'POST',
                data: { email: email, pass: pass }
            });
        },

        logout: function () {
            return $http({
                url: '/api/logout',
                method: 'GET'
            });
        }
    };
});
