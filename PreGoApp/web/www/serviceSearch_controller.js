app.directive('showErrors', function() {
	return {
		restrict : 'A',
		require : '^form',
		link : function(scope, el, attrs, formCtrl) {
			// find the text box element, which has the 'name' attribute
			var inputEl = el[0].querySelector("[name]");
			// convert the native text box element to an angular element
			var inputNgEl = angular.element(inputEl);
			// get the name on the text box
			var inputName = inputNgEl.attr('name');
			// only apply the has-error class after the user leaves the text box
			inputNgEl.bind('blur', function() {
				el.toggleClass('has-error', formCtrl[inputName].$invalid);
			});
			scope.$watch(function() {
				return scope.showErrorsCheckValidity;
			}, function(newVal, oldVal) {
				if (!newVal) {
					return;
				}
				el.toggleClass('has-error', formCtrl[inputName].$invalid);
			});
		}
	}
});

app.controller('ServiceSearchController', function($scope, $routeParams,
		ServiceSearchService) {
	$scope.serviceGenres = [];
	$scope.selectedServiceGenres = [];
	$scope.searchedServices = [];
	
	$scope.chosenService = [];
	
	ServiceSearchService.getServiceGenres()
	.then(function(response){
		$scope.serviceGenres = response.data;
	})
	.catch(function(error){
		console.log(error);
	});
	
	$scope.search = function() {
		ServiceSearchService.getSearchedServices($scope.selectedServiceGenres)
		.then(function(response){
			$scope.searchedServices = response;
		});
	}
	
	$scope.showService = function(service) {
		$scope.chosenService = service;	
	};
	
	$scope.hireService = function(){
		var newService = {
				service : $scope.chosenService.name
		};
		
		ServiceSearchService.hireService(newService).then(function(response) {
			if(response.data.exito){
				alert('Servicio Contratado.');
			}else{
				alert('Error en la contratacion del servicio.');
				console.log(response.data.error);
			}
        });
	}
});
