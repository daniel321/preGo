app.factory('PartyDetailService', function ($http, $q) {
    return {
	
		getPartyTypes: function () {
			return $http({
				url: '/api/partyTypes',
				method: 'GET'
			});
        },
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
        },
        getParty: function (key) {
            return $http({
                url: '/api/party/' + encodeURIComponent(key),
                method: 'GET'
            });
        }
    };
});
