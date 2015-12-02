app.controller('ServiceCreateController', function($scope, $routeParams,
		PartyServicesService) {
	$scope.publishedAmnt = [];
	
	$scope.publishedDJ = function() {
		return PartyServicesService.getPublishedServices();
	}
	
	$scope.publishService = function() {
		window.alert("Servicio publicado (nah, mentira).");
	};
	
	PartyServicesService.getPublishedServices().then(function (res) {
        angular.copy(res, $scope.publishedAmnt);
    });
});
