app.controller('testMapController', function ($scope, $routeParams, testMapService) {
	$scope.position = [0,0];

	$scope.initialized = false;

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
		var pos2=new google.maps.LatLng(-34.5865587,-58.4395189);

		var bounds = new google.maps.LatLngBounds();
		bounds.extend(pos);
		bounds.extend(pos2);
		map.fitBounds(bounds);

		// map.setCenter(pos);
		//map.setZoom(14);

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

	    	var pinColor2 = "5314F3";
	    	var pinImage2 = new google.maps.MarkerImage(
			"http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor2,
			new google.maps.Size(21, 34),
			new google.maps.Point(0,0),
			new google.maps.Point(10, 34)
		);

		var marker2 = new google.maps.Marker({
		    position: pos2,
		    map: map,
		    shadow:pinShadow,
		    icon: pinImage2,
		    title:"You are going here",
		    draggable:false
		});


		google.maps.event.addListener(marker, 'dragend', function() {
			var pos = marker.position;
			document.getElementById('current').innerHTML="latitude="+pos.lat().toFixed(5)+" longitude="+pos.lng().toFixed(5);

			$scope.position[0] = pos.lat();
			$scope.position[1] = pos.lng();

			map.setCenter(pos);
			map.setZoom(14);
		});

	}

	function success_callback(p){
		$scope.position[0] = p.coords.latitude;
		$scope.position[1] = p.coords.longitude;
	}
		
	function error_callback(p){
		console.log('error='+p.message);
	}

	var getPos = function(){
		if( $scope.initialized || geo_position_js.init() ){
			geo_position_js.getCurrentPosition(success_callback,error_callback,{enableHighAccuracy:true});
			$scope.initialized = true;
		}else{
			console.log("Functionality not available");
		}

	}

	getPos();

	if (!($scope.mapInitialized)){
		initialize_map("map_canvas2");
		initialize();

		$scope.mapInitialized = true;
	}	
});


