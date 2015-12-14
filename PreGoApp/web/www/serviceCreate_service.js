app.factory('ServiceCreateService', function($http, $q) {
	return {
//		getPublishedServices : function() {
//			return simpleHttpGet($http, '/api/services', $q.reject);
//		},
	
		getImageCandidates : function(){
			var folder = "tipos_servicio";
			return simpleHttpGet($http,'/api/imageCandidates?type='+folder, $q.reject);
		},

		getServiceGenres : function() {
			return $http({
				url : '/api/serviceGenres',
				method : 'GET'
			});
		},
		
		createService : function (service) {
	        return $http.post(
	            '/api/serviceCreate',
	            service
	        );
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
