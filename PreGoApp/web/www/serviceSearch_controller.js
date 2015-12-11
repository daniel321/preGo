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
		PartyServicesService) {
	$scope.publishedAmnt = [];
	
	$scope.serviceGenres = [];
	$scope.selectedServiceGenres = [];
	
	$scope.publishedDJ = function() {
		return PartyServicesService.getPublishedServices();
	}
	

	
	PartyServicesService.getPublishedServices().then(function (res) {
        angular.copy(res, $scope.publishedAmnt);
    });
	
	PartyServicesService.getServiceGenres()
	.then(function(response){
		$scope.serviceGenres = response.data;
	})
	.catch(function(error){
		console.log(error);
	});	
	
	$scope.save = function() {
		$scope.showErrorsCheckValidity = true;
		if ($scope.serviceForm.$valid) {
			alert('Servicio publicado.');
			$scope.reset();
			$scope.showErrorsCheckValidity = false;
		} else {
			alert("Complete los campos faltantes.");
		}
	};
	$scope.reset = function() {
		$scope.service = {
			name : '',
			description : '',
			price : '',
			detail : ''
		};
	}
});
