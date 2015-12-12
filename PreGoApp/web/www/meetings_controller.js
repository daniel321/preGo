app.controller('meetingsController', function ($scope, $http, MeetingsService ) {
	
	$scope.partyTypes = [];
	$scope.success = null;
	
	$scope.suggest = null;
	$scope.searching = true;
	
	MeetingsService.getMeetingSuggest().then(
		function(res){
			$scope.success = res.data.exito;
			$scope.suggest = res.data.usuarioAConocer;		
		}
	);
	
	$scope.qualify = function(like){
		MeetingsService.qualify($scope.suggest.email, like).then(
			function(res){
				if(res.data.exito){
					$scope.suggestNext();
				}else{
					console.log(res.data.error);
				}				
			},
			function(res){
				console.log(res);
				$scope.searching=false;
			}
		);
	};
	
	$scope.suggestNext = function(){
		$scope.searching = true;
		$scope.success=null;
		$scope.suggest=null;
		setTimeout(
			function(){
				MeetingsService.getMeetingSuggest().then(
					function(res){
						$scope.success = res.data.exito;
						$scope.suggest = res.data.usuarioAConocer;
						$scope.sinResultados = $scope.success && $scope.suggest==null;
						
						$scope.searching=false;
					}
					,
					function(res){
						console.log(res);
						$scope.searching=false;
					}
				);	
			}
			,2000 
		)
		
	};
	
	$scope.suggestNext();
	
	
});
