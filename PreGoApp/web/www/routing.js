app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/test', {
            templateUrl: 'www/index.partial.html',
            controller: 'IndexController'
        }).
        when('/', {
            templateUrl: 'www/home.partial.html',
            controller: 'HomeController'
        }).
        when('/chat/:contactNickname', {
            templateUrl: 'www/chat.partial.html',
            controller: 'ChatController'
        }).
        when('/partySearch', {
            templateUrl: 'www/partySearch.partial.html',
            controller: 'partySearchController'
        }).
        when('/partyCreate', {
            templateUrl: 'www/partyCreate.partial.html',
            controller: 'partyCreateController'
        }).
        when('/serviceCreate', {
            templateUrl: 'www/serviceCreate.partial.html',
            controller: 'ServiceCreateController'
        }).
        when('/serviceSearch', {
            templateUrl: 'www/serviceSearch.partial.html',
            controller: 'ServiceSearchController'
        }).
        when('/testMap', {
            templateUrl: 'www/testMap.partial.html',
            controller: 'testMapController'
        })

	/*.
        otherwise({
            redirectTo: '/addOrder'
        })*/;
  }]);

app.controller('IndexController', function ($scope) {

    $scope.message = 'This is index';

});
