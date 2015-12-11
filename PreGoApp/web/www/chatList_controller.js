app.controller('chatListController', function ($scope, $routeParams, chatListService) {
	$scope.matches = [];

	chatListService.getMatches().then(function (res) {
		if(res.data != null){
	       		angular.copy(res.data, $scope.matches);
		}	
   	});
});


