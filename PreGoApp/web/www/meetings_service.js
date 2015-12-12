app.factory('MeetingsService', function ($http, $q) {
    return {
	
		getMeetingSuggest: function () {
			return $http({
				url: '/api/meetingSuggests',
				method: 'GET'
			});
        }/*,
		getMusicGenres: function () {
			return $http({
				url: '/api/musicGenres',
				method: 'GET'
			});
        },		
        createParty: function (party) {
            return $http.post(
                '/api/party',
                party
            );
        }*/
    };
});
