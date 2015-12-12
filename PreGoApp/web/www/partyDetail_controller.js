app.controller('partyDetailController', function ($scope, $http, $routeParams, PartyDetailService) {
    var partyKey = $routeParams.partyKey;

    $scope.party = null;
	$scope.partyTypes = [];
	$scope.selectedItems = [];
	
	$scope.musicGenres = [];
	$scope.selectedMusicGenres = [];
	
	$scope.location = {
	   name:null,
	   lat:null,
	   lng:null
	};	
	
	$scope.clear = function () {
      $scope.location = {
        name: null,
        lat: null,
        lng: null
      };
    };
	
	$scope.datePicker = {
		date : {startDate: null, endDate: null},
		options : getCommonDatePickerOptions()
	};
	
	PartyDetailService.getParty(partyKey)
        .then(function (response) {
            $scope.party = response.data;
            //TODO: En la p�gina de b�squeda de fiestas se usa un objeto con estructura diferente al que se usa en partyCreate. Unificar.
            // Correcciones de compatibilidad del objeto::
            if (!$scope.party.fechaHoraDesde) {
                $scope.party.fechaHoraDesde = $scope.party.inicio
            }
            if (!$scope.party.fechaHoraHasta) {
                $scope.party.fechaHoraHasta = $scope.party.fin
            }
            if (!$scope.party.location) {
                $scope.party.location = $scope.party.pos
            }
            $scope.selectedItems = getTypes($scope.party.types, $scope.partyTypes);
            $scope.selectedMusicGenres = getTypes($scope.party.selectedMusicGenres, $scope.musicGenres);
        })
        .catch(function (error) {
            console.log(error);
        });

	PartyDetailService.getPartyTypes()
		.then(function(response){
			$scope.partyTypes = response.data;
		})
		.catch(function(error){
			console.log(error);
		});
		
	PartyDetailService.getMusicGenres()
		.then(function(response){
			$scope.musicGenres = response.data;
		})
		.catch(function(error){
			console.log(error);
		});

	var getType = function (typeCode, fullArray) {
	    for (var i = 0; i < fullArray.length; i++) {
	        var partyType = fullArray[i];
	        if (partyType.code == typeCode) {
	            return partyType;
	        }
	    }
	    return { code: typeCode, text: typeCode };
	}

	var getTypes = function (typeCodes, fullArray) {
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
