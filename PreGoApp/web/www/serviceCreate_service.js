app.factory('PartyServicesService', function($http, $q) {
	return {

		getPublishedServices : function() {
//			return simpleHttpGet($http, '/api/services', $q.reject);
			return "Garompa";
		},
	};
});