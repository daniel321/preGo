app.controller('partyDetailController', function ($scope, $http, $location, PartyDetailService) {
	$scope.position = [0,0];
	$scope.positionDest = [0,0];

	$scope.initialized = false;
	$scope.mapInitialized = false;

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

		document.getElementById('current').innerHTML="latitude="+$scope.position[0]+" longitude="+$scope.position[1];
		var pos=new google.maps.LatLng($scope.position[0],$scope.position[1]);
		var pos2=new google.maps.LatLng($scope.positionDest[0],$scope.positionDest[1]);

		var bounds = new google.maps.LatLngBounds();
		bounds.extend(pos);
		bounds.extend(pos2);
		map.fitBounds(bounds);
		// map.setCenter(pos);
		//map.setZoom(14);

		var dirDisp = new google.maps.DirectionsRenderer();
		dirDisp.setMap(map);
		dirDisp.setOptions(
			{
				polylineOptions:{strokeColor:"#4a4a4a",strokeWeight:3}, 
				suppressMarkers: true
			}
		);

		var dirSvc = new google.maps.DirectionsService();
		var req = {
			origin:pos,
			destination: pos2,
			travelMode: google.maps.TravelMode.WALKING
//			travelMode: google.maps.TravelMode.DRIVING
		};
		dirSvc.route(
			req,
			function (response,status){
				if(status == google.maps.DirectionsStatus.OK){
					dirDisp.setDirections(response);
					dirDisp.setMap(map);
				}				
			}
		);

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
		    draggable:false
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

	}

	function success_callback(p){
		$scope.position[0] = p.coords.latitude;
		$scope.position[1] = p.coords.longitude;
		getPartyDistance(false);
	}
		
	function error_callback(p){
		$scope.position[0] = -34.617568;
		$scope.position[1] = -58.368352;
		getPartyDistance(false);

		console.log('error='+p.message);
	}

	var getPos = function(){
		if( $scope.initialized || geo_position_js.init() ){
		    geo_position_js.getCurrentPosition(success_callback, error_callback, { enableHighAccuracy: true });
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

    var partyId = $location.search().id;
	var partyName = $location.search().nombre;

	var partyKey = null;
	if(partyId!=null){
		partyKey=partyId;
	}else{
		partyKey=partyName;		
	}
	
    $scope.party = null;
    $scope.partyTypes = [];
    $scope.selectedItems = [];

    $scope.musicGenres = [];
    $scope.selectedMusicGenres = [];
	
    $scope.location = {
        name: null,
        lat: null,
        lng: null
    };

    $scope.clear = function () {
        $scope.location = {
            name: null,
            lat: null,
            lng: null
        };
    };

    $scope.datePicker = {
        date: { startDate: null, endDate: null },
        options: getCommonDatePickerOptions()
    };

    function calcularCuando(desdeIsoStr)
    {
        var cuando = "";
        //var now = new Date(Date.now());
        //$scope.fechaHoraActual = Date.UTC(now.getUTCFullYear(),now.getUTCMonth(), now.getUTCDate() , now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());;
        var fechaHoraActual = new Date(Date.now());
        var fechaHoraDesde = new Date(Date.parse(desdeIsoStr));

        var diff = (fechaHoraDesde - fechaHoraActual)
        var minutos = diff / 1000 / 60;
        var horas = minutos / 60;
        var dias = horas / 24;

        if (diff > 0) {
            cuando = "En ";
        }
        else {
            cuando = "Hace ";
        }

        if (Math.abs(minutos) < 1) {
            cuando = "Ahora.";
        }
        if (Math.abs(horas) < 1) {
            cuando += Math.floor(Math.abs(minutos)) + " minuto(s)";
        }
        else if (Math.abs(dias) < 1) {
            cuando += Math.floor(Math.abs(horas)) + " hora(s)";
        }
        else {
            cuando += Math.floor(Math.abs(dias)) + " día(s)";
        }
        return cuando;
    }
    var getPartyTypesFinished = false;
    var getMusicGenresFinished = false;
    var getPartyFinished = false;

    function joinCallback() {
        if (getPartyTypesFinished && getMusicGenresFinished && getPartyFinished) {
            if ($scope.party.types) {
                $scope.selectedItems = getTypes($scope.party.types, $scope.partyTypes);
            }
            if ($scope.party.musicGenres) {
                $scope.selectedMusicGenres = getTypes($scope.party.musicGenres, $scope.musicGenres);
            }
            $scope.cuando = calcularCuando($scope.party.inicio);

        }
    }

    getPartyTypes(joinCallback);
    getMusicGenres(joinCallback);
    getParty(joinCallback);

    function getParty(callback) {
        PartyDetailService.getParty(partyKey)
            .then(function (response) {
                $scope.party = response.data;
    		$scope.positionDest = [$scope.party.pos.lat,$scope.party.pos.long];

                getPartyFinished = true;
                callback();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function getPartyDistance(callback) {
        PartyDetailService.getPartyDistance(partyKey, { lat: $scope.position[0], long: $scope.position[1] })
            .then(function (response) {
                $scope.party.distancia = response.data;
                if (callback) { callback(); }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
	
	$scope.asistir = function(){
		if($scope.party && $scope.party.id){
			$http.put(
                '/api/partyParticipation',
                {partyId: $scope.party.id}
            ).then(
				function(res){
					console.log(res.data);
					if(res.data.exito){
						getParty(joinCallback); //recarga para tomar las imagenes de los participantes
					}
				}
			);
		}else{
			console.log('No se cargo la fiesta correctamente');
		}
	}

    function getPartyTypes(callback) {
        PartyDetailService.getPartyTypes()
            .then(function (response) {
                $scope.partyTypes = response.data;
                getPartyTypesFinished = true;
                callback();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function getMusicGenres(callback) {
        PartyDetailService.getMusicGenres()
            .then(function (response) {
                $scope.musicGenres = response.data;
                getMusicGenresFinished = true;
                callback();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function getType(typeCode, fullArray) {
        for (var i = 0; i < fullArray.length; i++) {
            var partyType = fullArray[i];
            if (partyType.code == typeCode) {
                return partyType;
            }
        }
        return { code: typeCode, text: typeCode };
    }

    function getTypes(typeCodes, fullArray) {
        var result = []
        for (var i = 0; i < typeCodes.length; i++) {
            result.push(getType(typeCodes[i], fullArray));
        }
        return result;
    }

    //$scope.sendForm = function(){
    //	var party = {};
    //	party.name = $scope.name;
    //	party.description = $scope.description;
    //	party.from = $scope.datePicker.date.startDate;
    //	party.to = $scope.datePicker.date.endDate;
    //	party.location = $scope.location;

    //	party.types = $scope.getTypeCodes($scope.selectedItems);
    //	party.musicGenres = $scope.getTypeCodes($scope.selectedMusicGenres);	



    //	PartyDetailService.createParty(party).then(function(response) {
    //        console.log(response);
    //    });
    //}
});
