app.controller('ModalInstanceCtrl', function ($scope, $location, $uibModalInstance, sharedPartys, you, other) {

  $scope.you = you;
  $scope.other = other;
  $scope.sharedPartys2 = sharedPartys;
  
  $scope.chatNow = function () {
    $location.path('chat/').search({email: $scope.other.email,contactNickname: $scope.other.nickname});
	$uibModalInstance.dismiss('cancel');
  };

  $scope.close = function () {
    $uibModalInstance.dismiss('cancel');
  };
});


app.controller('meetingsController', function ($scope, $http,$location,$uibModal, MeetingsService ) {
	
	$scope.partyTypes = [];
	$scope.success = null;
	
	$scope.suggest = null;
	$scope.sharedPartys = null;
	
	$scope.searching = true;
		
	$scope.qualify = function(like){
		MeetingsService.qualify($scope.suggest.email, like).then(
			function(res){
				if(res.data.exito){
					if(res.data.match){
						var sharedPartys = $scope.sharedPartys;
						$scope.suggestNext();
						/*if(confirm('Vos y ' + $scope.suggest.nickname + ' se eligieron mutuamente, ¿ Querés comenzar a hablar ahora?')){
							$location.path('chat/').search({email: $scope.suggest.email,contactNickname: $scope.suggest.nickname});
						} */
						$scope.openMatchModal(res.data.matchInfo.you, res.data.matchInfo.other, sharedPartys);
					}
					$scope.suggestNext();
				}else{
					console.log(res.data.error);
					$scope.suggestNext();
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
						console.log(res.data.fiestasCompartidas);
						$scope.sharedPartys = res.data.fiestasCompartidas;
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
	$scope.animationsEnabled = true;

	$scope.openMatchModal = function (pYou, pOther, pSharedPartys) {

			var modalInstance = $uibModal.open(
				{
				animation: $scope.animationsEnabled,
				templateUrl: 'myModalContent.html',
				controller: 'ModalInstanceCtrl',
				//size: undefined,
				resolve: {
					sharedPartys : function(){
							return pSharedPartys;
					},
					you: function () {
							return pYou;
						},
					other: function () {
							return pOther;
						}
					},
					
				}
			);

			modalInstance.result.then(
				function (selectedItem) {
					console.log('Modal cerrado positivo');
				}, 
				function () {
					console.log('Modal cancelado');
			});
		};

		$scope.toggleAnimation = function () {
		$scope.animationsEnabled = !$scope.animationsEnabled;
	};
	
});
