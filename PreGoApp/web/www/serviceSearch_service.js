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
			return simpleHttpGet($http, '/api/serviceSearch?types=' + types, $q.reject);
		}
	}
});