app.factory('HomeService', function ($http, $q) {
    return {
        getUsers: function () {
            return simpleHttpGet($http, '/api/user', $q.reject);
        },

        login: function (nickname) {
            return simpleHttpGet($http, '/api/login/' + nickname, $q.reject);
        }
    };
});
