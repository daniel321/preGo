app.directive('preGoSelector', function(){
	return {
		templateUrl: '/plugins/pregoselector/pregoselector.html',
		restrict:'E',
		scope:{			
		    availableItems : '=',
		    selectedItems : '='
		},	
		controller: ['$scope', function($scope) {			
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
		}],
		link: function (scope, element, attrs, controller, transcludeFn) {
		    var isInSelectedItemsArray = function (code) {
		        for (var i = 0; i < scope.selectedItems.length; i++) {
		            var selectedItem = scope.selectedItems[i];
		            if (selectedItem.code == code) { return true;}
		        }
		        return false;
		    }

		    scope.$watch('selectedItems', function (newValue, oldValue) {
		        for (var i = 0; i < scope.availableItems.length; i++) {
		            var item = scope.availableItems[i];
		            if (isInSelectedItemsArray(item.code)) {
		                item.selected = true;
		            } else {
		                item.selected = false;
		            }
		        }
		    });
		}
	};
}
);