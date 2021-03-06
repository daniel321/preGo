app.controller('ChatController', function ($scope, $location, ChatService) {
    $scope.email = $location.search().email;
	$scope.contactNickname = $location.search().contactNickname;
    
    $scope.messages = [];

    ChatService.getChat($scope.email).then(function (res) {
        angular.copy(res, $scope.messages);
    });

    $scope.newMessage = "";
    $scope.sendMessage = function () {
        ChatService.sendMessage($scope.email, $scope.newMessage).then(function (res) {
            ChatService.getChat($scope.email).then(function (res) {
                angular.copy(res, $scope.messages);
            });
            $scope.newMessage = "";
        });	
    }

    var f = function(){
		ChatService.getChat($scope.email).then(
			function (res) {
				if(res.length > $scope.messages.length)
					angular.copy(res, $scope.messages);
    			});
		setTimeout(f,5000);
	}

	setTimeout(f,5000);

});
