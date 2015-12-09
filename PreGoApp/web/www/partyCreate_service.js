app.factory('PartyCreateService', function ($http, $q) {
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
        }
    };
});
