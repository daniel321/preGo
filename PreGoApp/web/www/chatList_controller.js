app.controller('chatListController', function ($scope, $routeParams, chatListService) {
	$scope.matches = [];

	chatListService.getMatches().then(function (res) {
       		angular.copy(res.data, $scope.matches);
   	});
});


