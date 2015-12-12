app.controller('partyDetailController', function ($scope, $http, $routeParams, PartyDetailService) {
    var partyKey = $routeParams.partyKey;

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
            $scope.partyDetail = response.data;
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
		party.from = $scope.datePicker.date.startDate;
		party.to = $scope.datePicker.date.endDate;
		party.location = $scope.location;
		
		party.types = $scope.getTypeCodes($scope.selectedItems);
		party.musicGenres = $scope.getTypeCodes($scope.selectedMusicGenres);	
		
		
		
		PartyDetailService.createParty(party).then(function(response) {
            console.log(response);
        });
	}
});
