app.factory('ChatService', function ($http, $q) {
    return {
        getChat: function (contactNickname) {
            return simpleHttpGet($http, '/api/Chat/' + contactNickname, $q.reject);
        },

        sendMessage: function (contactNickname, message) {
            return $http.post(
                '/api/Chat/' + contactNickname,
                { message: message }
            );
        }
    };
});
