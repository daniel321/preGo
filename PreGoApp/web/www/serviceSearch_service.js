app.factory('PartyServicesService', function($http, $q) {
	return {
		getPublishedServices : function() {
			return simpleHttpGet($http, '/api/services', $q.reject);
		},
		
		getServiceGenres: function () {
			return $http({
				url: '/api/serviceGenres',
				method: 'GET'
			});
	    }
	
//		sendService: function (name, description, price, detail) {
//	        return $http.post(
//	            '/api/services',
//	            { 
//	            	name: name,
//	            	description: description,
//	            	price: price,
//	            	detail: detail
//	            }
//	        );
//	    }
	}
});