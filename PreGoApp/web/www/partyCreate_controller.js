app.controller('partyCreateController', function ($scope, PartyCreateService ) {
	
	$scope.partyTypes = [];
	$scope.selectedItems = [];
	
	PartyCreateService.getPartyTypes()
		.then(function(response){
			$scope.partyTypes = response.data;
		})
		.catch(function(error){
			console.log(error);
		}); 
	
});
