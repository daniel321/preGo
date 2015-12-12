app.controller('meetingsController', function ($scope, $http, MeetingsService ) {
	
	$scope.partyTypes = [];
	$scope.exitoso = null;
	
	$scope.sugerencia = null;
	
	/*
		nickname: user.nickname
		, avatar_url: user.avatar_url
		, sexo: user.sexo
	*/
	 
	MeetingsService.getMeetingSuggest().then(
		function(res){
			$scope.exitoso = res.data.exito;
			$scope.sugerencia = res.data.usuarioAConocer;
			
		}
	);
	
});
