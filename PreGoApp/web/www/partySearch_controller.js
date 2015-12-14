app.controller('partySearchController', function ($scope, $location,$http,$cookies, partySearchService) {
    	// $scope.navBar.src = 'www/partySearchNavBar.html';
	$scope.common_partys = [];
	$scope.promoted_partys = [];

	$scope.partyTypes = [];
	$scope.selectedItems = [];

	$scope.showMenu = 0;
	$scope.position = [0,0];

	$scope.mapInitialized = false;
	$scope.initialized = false;
	$scope.location = null;

	$scope.datePicker = {
		date : {startDate: null, endDate: null},
		options : getCommonDatePickerOptions()
	};

	var reset = function(){
		$scope.showMenu = 0;
		$scope.common_partys = [];
		$scope.promoted_partys = [];
	}
	
	$scope.online = true;	
	$scope.updateOnlineMode = function(){
		$scope.online = !($cookies.get('offline')=="true");
	}	
	$scope.updateOnlineMode();
	
	$scope.hardLocations = null;	
	$scope.getHardLocations = function(){
		$http({
				url: '/api/hardLocations',
				method: 'GET'
			}).then(function(res){
				$scope.hardLocations = res.data;
			});
	}
	$scope.getHardLocations();

	$scope.enableTodayPartysMenu = function(){
		if($scope.showMenu != 1){
			$scope.showMenu = 1;
		}else{
			$scope.showMenu = 0;
		}
	}

	$scope.enableCloseByPartysMenu = function(){
		if($scope.showMenu != 2){
			//document.getElementById("toleranceForm").value = 10;

			if (!($scope.mapInitialized)){
				initialize_map("map_canvas");
				initialize();

				$scope.mapInitialized = true;
			}

			$scope.showMenu = 2;
		}else{
			$scope.showMenu = 0;	
		}
	}

	$scope.enablePartyTypesMenu = function(){
		if($scope.showMenu != 3){
			partySearchService.getPartyTypes()
				.then(function(response){
					angular.copy(response.data, $scope.partyTypes);
				})
				.catch(function(error){
					console.log(error);
			});

			$scope.showMenu = 3;
		}else{
			$scope.showMenu = 0;
		}
	}

    	$scope.getAllPartys = function () {
		getPos();
		reset();

		var types = [];
		for (key in $scope.selectedItems){
			var type = $scope.selectedItems[key];
			types.push(type.code);
		}

		partySearchService.getCommonPartys($scope.position[0],$scope.position[1],types).then(function (res) {
        		angular.copy(res, $scope.common_partys);
    		});

		partySearchService.getPromotedPartys($scope.position[0],$scope.position[1],types).then(function (res) {
        		angular.copy(res, $scope.promoted_partys);
    		});
    	}

	$scope.findTodayPartys = function (){
		getPos();
		reset();

		var start = $scope.datePicker.date.startDate;
		var end = $scope.datePicker.date.endDate;

		if((start == null)||(end == null)){
			start = "1800-12-18T09:30:00";
			end = "1800-12-18T09:30:00";
		}else{
			start = start.toISOString();
			end = end.toISOString();
		}

		partySearchService.getCommonPartysByDate($scope.position[0],$scope.position[1],start,end).then(function (res) {
        		angular.copy(res, $scope.common_partys);
    		});

		partySearchService.getPromotedPartysByDate($scope.position[0],$scope.position[1],start,end).then(function (res) {
        		angular.copy(res, $scope.promoted_partys);
    		});
	}

	$scope.findCloseByPartys = function (){
		getPos();
		reset();

		var tolerance = document.getElementById("toleranceForm").value;

		partySearchService.getCommonPartysCloseBy($scope.position[0],$scope.position[1],tolerance).then(function (res) {
        		angular.copy(res, $scope.common_partys);
    		});

		partySearchService.getPromotedPartysCloseBy($scope.position[0],$scope.position[1],tolerance).then(function (res) {
        		angular.copy(res, $scope.promoted_partys);
    		});
	}

	//---------------------------------------------------------------

	function initialize_map(id){
		var myOptions = {
			zoom: 4,
			mapTypeControl: true,
			mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
			navigationControl: true,
			navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
			mapTypeId: google.maps.MapTypeId.ROADMAP      
		}	
		map = new google.maps.Map(document.getElementById(id), myOptions);
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
		$scope.position[0] = p.coords.latitude;
		$scope.position[1] = p.coords.longitude;

		document.getElementById('current').innerHTML="latitude="+p.coords.latitude.toFixed(5)+" longitude="+p.coords.longitude.toFixed(5);
		var pos=new google.maps.LatLng(p.coords.latitude,p.coords.longitude);
		map.setCenter(pos);
		map.setZoom(14);

		var infowindow = new google.maps.InfoWindow({
		    content: "<strong>you are here</strong>"
		});

   		var pinShadow = new google.maps.MarkerImage(
			"http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
	        	new google.maps.Size(40, 37),
	        	new google.maps.Point(0, 0),
	        	new google.maps.Point(12, 35)
		);

	    	var pinColor = "FE7569";
	    	var pinImage = new google.maps.MarkerImage(
			"http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
			new google.maps.Size(21, 34),
			new google.maps.Point(0,0),
			new google.maps.Point(10, 34)
		);

		var marker = new google.maps.Marker({
		    position: pos,
		    map: map,
		    shadow:pinShadow,
		    icon: pinImage,
		    title:"You are here",
		    draggable:true
		});

		google.maps.event.addListener(marker, 'dragend', function() {
			var pos = marker.position;
			document.getElementById('current').innerHTML="latitude="+pos.lat()+" longitude="+pos.lng();

			$scope.position[0] = pos.lat();
			$scope.position[1] = pos.lng();

			map.setCenter(pos);
			map.setZoom(14);
		});

	}

	function success_callback(p){
		if($scope.online || $scope.location==null){
			$scope.position[0] = p.coords.latitude;
			$scope.position[1] = p.coords.longitude;
		}else{
			$scope.position[0] = $scope.location.lat;
			$scope.position[1] = $scope.location.lng;
		}
	}
		
	function error_callback(p){		
		if($scope.online || $scope.location==null){
			$scope.position[0] = -34.617568;
			$scope.position[1] = -58.368352;
			console.log('error='+p.message);
		}else{
			$scope.position[0] = $scope.location.lat;
			$scope.position[1] = $scope.location.lng;
		}
	}

	var getPos = function(){		
		if( $scope.initialized || geo_position_js.init() ){
			
			geo_position_js.getCurrentPosition(success_callback,error_callback,{enableHighAccuracy:true});
			$scope.initialized = true;
		
		}else{
			console.log("Functionality not available");
		}
	}
	
	$scope.viewParty = function(nombre, id){
		$location.path('partyDetail/').search({id: id});
	}

// ---------------------------------------------------------------------------
	reset();
	geo_position_js.init();
	geo_position_js.getCurrentPosition(success_callback,error_callback,{enableHighAccuracy:true});

    	var f = function(){
		getPos();
		var tolerance = 100;

		partySearchService.getCommonPartysCloseBy($scope.position[0],$scope.position[1],tolerance).then(function (res) {
        		angular.copy(res, $scope.common_partys);
    		});

		partySearchService.getPromotedPartysCloseBy($scope.position[0],$scope.position[1],tolerance).then(function (res) {
        		angular.copy(res, $scope.promoted_partys);
    		});
	}	

	setTimeout(f,3000);
});


