app.directive('preGoSelector', function(){
	return {
		templateUrl: '/plugins/pregoselector/pregoselector.html',
		restrict:'E',
		scope:{			
			availableItems : '=',
			selectedItems : '='
		}		
		, controller: ['$scope', function($scope) {			
			$scope.updateSelectedItems = function(){
				$scope.selectedItems=[];
				for(var i=0;i<$scope.availableItems.length;i++){
					var item = $scope.availableItems[i];
					if(item.selected){
						$scope.selectedItems.push(
							{
								code: item.code,
								description: item.name
							});	
					}
				}
			}
		}]    
	};
}
);