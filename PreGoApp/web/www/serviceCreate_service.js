app.factory('PartyServicesService', function($http, $q) {
	return {

		getPublishedServices : function() {
//			return simpleHttpGet($http, '/api/services', $q.reject);
//			return "Garompa";
//			$http.get("/api/services").success(function (data) {
//				$scope.friends = data;
//			}).error(function () {
//				alert("an unexpected error ocurred!");
//			});
			return simpleHttpGet($http, '/api/services', $q.reject);
		}
	}
});