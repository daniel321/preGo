app.controller('chatListController', function ($scope, $location, chatListService) {
	$scope.matches = [];

	chatListService.getMatches().then(function (res) {
		if(res.data != null){
	       		angular.copy(res.data, $scope.matches);
		}	
   	});
	
	$scope.chatWith = function(match){
		$location.path('chat/').search({email: match.email ,contactNickname: match.nickname});		
	}
});


