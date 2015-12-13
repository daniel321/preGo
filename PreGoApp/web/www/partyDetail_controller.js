app.controller('partyDetailController', function ($scope, $http, $location, PartyDetailService) {
    $scope.position = [];

    function success_callback(p) {
        $scope.position[0] = p.coords.latitude;
        $scope.position[1] = p.coords.longitude;
        getPartyDistance();
    }

    function error_callback(p) {
        $scope.position[0] = -34.617568;
        $scope.position[1] = -58.368352;
        getPartyDistance();
        console.log('error=' + p.message);
    }

    function getPos() {
        if ($scope.initialized || geo_position_js.init()) {
            geo_position_js.getCurrentPosition(success_callback, error_callback, { enableHighAccuracy: true });
            $scope.initialized = true;
        } else {
            $scope.position[0] = -34.617568;
            $scope.position[1] = -58.368352;

            console.log("Functionality not available");
        }
    }
    getPos();

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
