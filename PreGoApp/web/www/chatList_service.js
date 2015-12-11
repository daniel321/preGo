app.factory('chatListService', function ($http, $q) {
    return {
	getMatches: function () {
		return $http({url: '/api/matches',method: 'GET'});
        },
    };
});
