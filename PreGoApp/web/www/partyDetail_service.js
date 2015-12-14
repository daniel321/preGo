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
        getParty: function (key, currentPos) {
            return $http({
                url: '/api/party/' + encodeURIComponent(key),
                method: 'GET'
            });
        },
        getPartyDistance: function (key, currentPos) {
            return $http({
                url: '/api/partyDistance/' + encodeURIComponent(key)
                    + "?lat=" + encodeURIComponent(currentPos.lat)
                    + "&long=" + encodeURIComponent(currentPos.long),
                method: 'GET'
            });
        },
        sendComment: function(partyId, comment) {
            return $http.put(
                '/api/partyComment',
                {
                    partyId: partyId,
                    comment: comment
                }
            );
        }
        
    };
});
