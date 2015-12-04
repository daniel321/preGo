app.controller('partySearchController', function ($scope, $routeParams, partySearchService) {
    	// $scope.navBar.src = 'www/partySearchNavBar.html';
	$scope.common_partys = [];
	$scope.promoted_partys = [];

	$scope.showMenu = 0;
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

	var reset = function(){
		$scope.showMenu = 0;
		$scope.common_partys = [];
		$scope.promoted_partys = [];
	}

	$scope.enableTodayPartysMenu = function(){
		if($scope.showMenu != 1)
			$scope.showMenu = 1;
		else
			$scope.showMenu = 0;

		var date = new Date();
		document.getElementById("dayForm").value = date.getDate();
		document.getElementById("monthForm").value = date.getMonth()+1;
		document.getElementById("yearForm").value = date.getFullYear();
	}

	$scope.enableCloseByPartysMenu = function(){
		if($scope.showMenu != 2)
			$scope.showMenu = 2;
		else
			$scope.showMenu = 0;	
	}

    	$scope.getAllPartys = function () {
		reset();

		partySearchService.getCommonPartys($scope.position[0],$scope.position[1]).then(function (res) {
        		angular.copy(res, $scope.common_partys);
    		});

		partySearchService.getPromotedPartys($scope.position[0],$scope.position[1]).then(function (res) {
        		angular.copy(res, $scope.promoted_partys);
    		});
    	}

	$scope.findTodayPartys = function (){
		reset();

		var day = document.getElementById("dayForm").value;
		var month = document.getElementById("monthForm").value;
		var year = document.getElementById("yearForm").value;

		partySearchService.getCommonPartysToday($scope.position[0],$scope.position[1],day,month,year).then(function (res) {
        		angular.copy(res, $scope.common_partys);
    		});

		partySearchService.getPromotedPartysToday($scope.position[0],$scope.position[1],day,month,year).then(function (res) {
        		angular.copy(res, $scope.promoted_partys);
    		});
	}

	$scope.findCloseByPartys = function (){
		reset();

		partySearchService.getCommonPartysCloseBy($scope.position[0],$scope.position[1],10).then(function (res) {
        		angular.copy(res, $scope.common_partys);
    		});

		partySearchService.getPromotedPartysCloseBy($scope.position[0],$scope.position[1],10).then(function (res) {
        		angular.copy(res, $scope.promoted_partys);
    		});
	}
});
