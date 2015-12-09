app.factory('HomeService', function ($http, $q) {
    return {
        getUsers: function () {
            return simpleHttpGet($http, '/api/user', $q.reject);
        },

        login: function (email, pass) {
            return $http({
                url: '/api/login',
                method: 'POST',
                data: { email: email, pass: pass }
            });
        },

    };
});
