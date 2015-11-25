app.controller('partySearchController', function ($scope, $routeParams, partySearchService) {
	$scope.common_partys = [];
	$scope.promoted_partys = [];
	$scope.distance = "";

	partySearchService.getCommonPartys().then(function (res) {
		angular.copy(res, $scope.common_partys);
	});

	partySearchService.getPromotedPartys().then(function (res) {
		angular.copy(res, $scope.promoted_partys);
	});

    	$scope.getDistance = function (direccion) {
		$scope.distance = "100km"; // TODO calcularlo con google maps y la direccion...
    	}

    	$scope.getAllPartys = function () {
		partySearchService.getCommonPartys().then(function (res) {
        		angular.copy(res, $scope.common_partys);
    		});

		partySearchService.getPromotedPartys().then(function (res) {
        		angular.copy(res, $scope.promoted_partys);
    		});
    	}

	$scope.findTodayPartys = function (){
		partySearchService.getCommonPartysToday().then(function (res) {
        		angular.copy(res, $scope.common_partys);
    		});

		partySearchService.getPromotedPartysToday().then(function (res) {
        		angular.copy(res, $scope.promoted_partys);
    		});
	}

	$scope.findCloseByPartys = function (){
		partySearchService.getCommonPartysCloseBy().then(function (res) {
        		angular.copy(res, $scope.common_partys);
    		});

		partySearchService.getPromotedPartysCloseBy().then(function (res) {
        		angular.copy(res, $scope.promoted_partys);
    		});
	}

});
