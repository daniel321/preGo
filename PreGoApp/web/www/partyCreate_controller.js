app.controller('partyCreateController', function ($scope, $http,$location, $cookies, PartyCreateService ) {
    $scope.esSugerida = false;
	$scope.partyTypes = [];
	$scope.selectedItems = [];
	
	$scope.musicGenres = [];
	$scope.selectedMusicGenres = [];
	
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
		party.location = {
			name : $scope.location.name,
			lat : $scope.location.lat,
			long : $scope.location.long		
		}
		
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
	
	$scope.getHardLocations();
});
