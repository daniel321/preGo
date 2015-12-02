app.controller('ServiceCreateController', function($scope, $routeParams,
		PartyServicesService) {

	$scope.publishedAmnt = [];
	
	$scope.publishedDJ = function() {
		return PartyServicesService.getPublishedServices();
	}
	
	PartyServicesService.getPublishedServices().then(function (res) {
        angular.copy(res, $scope.publishedAmnt);
    });
});
