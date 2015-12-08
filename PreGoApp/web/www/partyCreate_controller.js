app.controller('partyCreateController', function ($scope, PartyCreateService ) {
	
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
});
