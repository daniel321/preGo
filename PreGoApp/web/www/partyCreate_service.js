app.factory('PartyCreateService', function ($http, $q) {
    return {
	
		getPartyTypes: function () {
            //return simpleHttpGet($http, '/api/partyTypes', $q.reject);
			return $http({
				url: '/api/partyTypes',
				method: 'GET'
			});
        } 
    };
});
