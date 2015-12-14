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

app.controller('ServiceCreateController', function($scope, $routeParams, ServiceCreateService) {
	$scope.publishedAmnt = [];
	$scope.serviceGenres = [];
	$scope.selectedServiceGenres = [];

	$scope.imageSelected = "";
	$scope.imageCandidates = [];	


	$scope.service = {
			name : '',
			description : '',
			price : '',
			detail : '',
			highlighted : false,
			genre : '',
			img : 'dist/img/no_img.jpg'
		};

	ServiceCreateService.getImageCandidates().then(function (res) {
        	angular.copy(res, $scope.imageCandidates);

		$scope.imageCandidates.forEach(function(element,index,array){
			var select = document.getElementById("select");  
	    		var el = document.createElement("option");
	    		el.textContent = array[index].split("dist/img/tipos_servicio/")[1];
	    		el.value = array[index];
	    		select.appendChild(el);
		});

		$scope.imageSelected = $scope.imageCandidates[0];
    	});
	
	$scope.updateSelected = function(){
		var select = document.getElementById("select");  
		var newVal = select.options[select.selectedIndex].value;
		$scope.imageSelected = newVal;
	}

	
	$scope.publishedDJ = function() {
		return ServiceCreateService.getPublishedServices();
	}
	
	ServiceCreateService.getServiceGenres()
	.then(function(response){
		$scope.serviceGenres = response.data;
	})
	.catch(function(error){
		console.log(error);
	});
	
//	ServiceCreateService.getPublishedServices().then(function (res) {
//        angular.copy(res, $scope.publishedAmnt);
//    });
	
	$scope.save = function() {
		$scope.showErrorsCheckValidity = true;
		if ($scope.serviceForm.$valid) {
			$scope.sendForm();
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
			detail : '',
			highlighted : false,
			genre : '',
			img : 'dist/img/no_img.jpg'
		};
		$scope.selectedServiceGenres = [];
	}
	
	$scope.toggleHighlighted = function () {
	    $scope.service.highlighted = !$scope.service.highlighted;
	}
	
	$scope.selectGenre = function() {
		$scope.service.genre = $scope.selectedServiceGenres[0].code;
	}
	
	$scope.sendForm = function(){
		var newService = {
				name : $scope.service.name,
				description : $scope.service.description,
				price : '$'+$scope.service.price,
				detail : $scope.service.detail,
				highlighted : $scope.service.highlighted,
				genre : $scope.service.genre,
				img : $scope.service.img
		};	
		
		ServiceCreateService.createService(newService).then(function(response) {
			if(response.data.exito){
				alert('Servicio publicado.');
			}else{
				alert('Error en la publicación del servicio.');
				console.log(response.data.error);
			}
        });
	}
});
