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
								icon_uri: item.icon_uri,
								code: item.code,
								text: item.text
							});	
					}
				}
			}
		}]    
	};
}
);