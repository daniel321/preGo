app.factory('MeetingsService', function ($http, $q) {
    return {
	
		getMeetingSuggest: function () {
			return $http({
				url: '/api/meetingSuggests',
				method: 'GET'
			});
        }
		,qualify: function(email, like){
			return $http.post(
                '/api/meetingQualify',
                {
					email: email,
					like: like
				}
            );
		}
		/*,
		
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

