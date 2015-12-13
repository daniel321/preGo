app.controller('partyCreateController', function ($scope, $http,$location, PartyCreateService ) {
    $scope.esSugerida = false;
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

	$scope.toggleEsSugerida = function () {
	    $scope.esSugerida = !$scope.esSugerida;
	}
	
	PartyCreateService.getPartyTypes()
		.then(function(response){
			$scope.partyTypes = response.data;
		})
		.catch(function(error){
			console.log(error);
		});
		
	PartyCreateService.getMusicGenres()
		.then(function(response){
			$scope.musicGenres = response.data;
		})
		.catch(function(error){
			console.log(error);
		});	
		
	$scope.getTypeCodes = function(typesArray){
		var res=[];
		for(var i=0; i<typesArray.length;i++){
			res.push(typesArray[i].code);
		}
		return res;
	}

	$scope.sendForm = function(){
		var party = {};
		party.name = $scope.name;
		party.description = $scope.description;
		party.from = $scope.datePicker.date.startDate.toISOString();
		party.to = $scope.datePicker.date.endDate.toISOString();
		party.location = $scope.location;
		
		party.types = $scope.getTypeCodes($scope.selectedItems);
		party.musicGenres = $scope.getTypeCodes($scope.selectedMusicGenres);

		party.esSugerida = $scope.esSugerida;
		
		
		
		PartyCreateService.createParty(party).then(function(response) {
		    console.log(response);
			if(response.data.exito){
				$location.path('partyDetail/').search({id: response.data.id});
			}else{
				console.log(response.data.error);
			}
        });
	}
});
