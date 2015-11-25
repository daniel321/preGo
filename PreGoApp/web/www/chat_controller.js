app.controller('ChatController', function ($scope, $routeParams, ChatService) {
    $scope.contactNickname = $routeParams.contactNickname;
    
    $scope.messages = [];

    ChatService.getChat($scope.contactNickname).then(function (res) {
        angular.copy(res, $scope.messages);
    });

    $scope.newMessage = "";
    $scope.sendMessage = function () {
        ChatService.sendMessage($scope.contactNickname, $scope.newMessage).then(function (res) {
            ChatService.getChat($scope.contactNickname).then(function (res) {
                angular.copy(res, $scope.messages);
            });
            $scope.newMessage = "";
        });	
    }
});
