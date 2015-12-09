app.factory('RegisterService', function ($http, $q) {
    return {
        register: function (user) {
            return $http({
                url: '/api/user',
                method: 'PUT',
                data: user
            });
        }
    };
});
