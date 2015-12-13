app.factory('PartyServicesService', function($http, $q) {
	return {
		getPublishedServices : function() {
			return simpleHttpGet($http, '/api/services', $q.reject);
		},

		getServiceGenres : function() {
			return $http({
				url : '/api/serviceGenres',
				method : 'GET'
			});
		},

		getSearchedServices : function(types) {
			url = '/api/serviceSearch';
			if(types.length > 0) {
				url += '?types[]=' + types[0].code;
				for(i = 1; i < types.length; i++) {
					url += '&types[]='+types[i].code;
				}
			}
			return simpleHttpGet($http, url, $q.reject);
		}
	}
});