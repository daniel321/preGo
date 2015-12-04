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

		initialize_map();
		initialize();
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

	//---------------------------------------------------------------

	function initialize_map(){
	    var myOptions = {
		      zoom: 4,
		      mapTypeControl: true,
		      mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
		      navigationControl: true,
		      navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
		      mapTypeId: google.maps.MapTypeId.ROADMAP      
		    }	
		map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	}
	function initialize(){
		if(geo_position_js.init())
		{
			document.getElementById('current').innerHTML="Receiving...";
			geo_position_js.getCurrentPosition(show_position,function(){document.getElementById('current').innerHTML="Couldn't get location"},{enableHighAccuracy:true});
		}
		else
		{
			document.getElementById('current').innerHTML="Functionality not available";
		}
	}

	function show_position(p){
		document.getElementById('current').innerHTML="latitude="+p.coords.latitude.toFixed(2)+" longitude="+p.coords.longitude.toFixed(2);
		var pos=new google.maps.LatLng(p.coords.latitude,p.coords.longitude);
		map.setCenter(pos);
		map.setZoom(14);

		var infowindow = new google.maps.InfoWindow({
		    content: "<strong>yes</strong>"
		});

		var marker = new google.maps.Marker({
		    position: pos,
		    map: map,
		    title:"You are here"
		});

		google.maps.event.addListener(marker, 'click', function() {
		  infowindow.open(map,marker);
		});
	
	}
});
