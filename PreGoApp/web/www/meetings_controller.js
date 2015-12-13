app.controller('meetingsController', function ($scope, $http,$location, MeetingsService ) {
	
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
					if(res.data.match){
						if(confirm('Vos y ' + $scope.suggest.nickname + ' se eligieron mutuamente, ¿ Querés comenzar a hablar ahora?')){
							$location.path('chat/' + $scope.suggest.email);
						} 
					}
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
