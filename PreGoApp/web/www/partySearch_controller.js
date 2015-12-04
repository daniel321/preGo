app.controller('partySearchController', function ($scope, $routeParams, partySearchService) {
    	// $scope.navBar.src = 'www/partySearchNavBar.html';
	$scope.common_partys = [];
	$scope.promoted_partys = [];

	$scope.position = [0,0];

	if(geo_position_js.init()){
		geo_position_js.getCurrentPosition(success_callback,error_callback,{enableHighAccuracy:true});
	}else{
		console.log("Functionality not available");
	}

	function success_callback(p){
		$scope.position[0] = p.coords.latitude;
		$scope.position[1] = p.coords.longitude;
		$scope.getAllPartys();
	}
		
	function error_callback(p){
		console.log('error='+p.message);
	}

    	$scope.getAllPartys = function () {
		partySearchService.getCommonPartys($scope.position[0],$scope.position[1]).then(function (res) {
        		angular.copy(res, $scope.common_partys);
    		});

		partySearchService.getPromotedPartys($scope.position[0],$scope.position[1]).then(function (res) {
        		angular.copy(res, $scope.promoted_partys);
    		});
    	}

	$scope.findTodayPartys = function (){
		partySearchService.getCommonPartysToday($scope.position[0],$scope.position[1]).then(function (res) {
        		angular.copy(res, $scope.common_partys);
    		});

		partySearchService.getPromotedPartysToday($scope.position[0],$scope.position[1]).then(function (res) {
        		angular.copy(res, $scope.promoted_partys);
    		});
	}

	$scope.findCloseByPartys = function (){
		partySearchService.getCommonPartysCloseBy($scope.position[0],$scope.position[1],10).then(function (res) {
        		angular.copy(res, $scope.common_partys);
    		});

		partySearchService.getPromotedPartysCloseBy($scope.position[0],$scope.position[1],10).then(function (res) {
        		angular.copy(res, $scope.promoted_partys);
    		});
	}
});
