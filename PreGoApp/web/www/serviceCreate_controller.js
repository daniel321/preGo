app.controller('ServiceCreateController', function($scope, $routeParams,
		PartyServicesService) {

	$scope.publishedAmnt = [];
	
	$scope.publishedDJ = function() {
		return PartyServicesService.getPublishedServices();
	}
	
	PartyServicesService.getPublishedServices().then(function (res) {
        angular.copy(res, $scope.publishedAmnt);
    });

	// DE ACA PARA ABAJO ES CHOREADO PARA TENER A MANO COMO REFERENCIA

	// $scope.navBar.src = 'www/partySearchNavBar.html';
	// $scope.common_partys = [];
	// $scope.promoted_partys = [];
	//
	// $scope.position = [ 0, 0 ];
	// $scope.distance = "";

	// if (geo_position_js.init()) {
	// geo_position_js.getCurrentPosition(success_callback,
	// error_callback, {
	// enableHighAccuracy : true
	// });
	// } else {
	// console.log("Functionality not available");
	// }
	//
	// function success_callback(p) {
	// $scope.position[0] = p.coords.latitude;
	// $scope.position[1] = p.coords.longitude;
	// $scope.getAllPartys();
	// }
	//
	// function error_callback(p) {
	// console.log('error=' + p.message);
	// }
	//
	// $scope.getAllPartys = function() {
	// partySearchService.getCommonPartys().then(function(res) {
	// angular.copy(res, $scope.common_partys);
	// });
	//
	// partySearchService.getPromotedPartys().then(function(res) {
	// angular.copy(res, $scope.promoted_partys);
	// });
	// }
	//
	// $scope.findTodayPartys = function() {
	// partySearchService.getCommonPartysToday().then(function(res) {
	// angular.copy(res, $scope.common_partys);
	// });
	//
	// partySearchService.getPromotedPartysToday().then(function(res) {
	// angular.copy(res, $scope.promoted_partys);
	// });
	// }
	//
	// $scope.findCloseByPartys = function() {
	// // console.log("finding partys close by");
	//
	// $scope.getAllPartys();
	//
	// var tolerance = 10; // dist max para mostrarlo
	//
	// for (var i = 0; i < $scope.promoted_partys.length; i++) {
	// var party = $scope.promoted_partys[i];
	// var pos = party[1][5];
	// $scope.getDistance(pos);
	//
	// if ($scope.distance > tolerance) {
	// // console.log("saco: " + $scope.common_partys[i][0]);
	// $scope.promoted_partys.splice(i, 1);
	// i--;
	// }
	// }
	//
	// for (var i = 0; i < $scope.common_partys.length; i++) {
	// var party = $scope.common_partys[i];
	// var pos = party[1][5];
	// $scope.getDistance(pos);
	//
	// if ($scope.distance > tolerance) {
	// // console.log("saco: " + $scope.common_partys[i][0]);
	// $scope.common_partys.splice(i, 1);
	// i--;
	// }
	// }
	// }
	//
	// var enRadianes = function(valor) {
	// return (Math.PI / 180) * valor;
	// }
	//
	// $scope.getDistance = function(direccion) {
	// // console.log("lat: " + $scope.position[0]);
	// // console.log("long: " + $scope.position[0]);
	//
	// // console.log("dest lat: " + direccion[0]);
	// // console.log("dest long: " + direccion[0]);
	//
	// var lat = $scope.position[0];
	// var long = $scope.position[1];
	//
	// var lat2 = direccion[0];
	// var long2 = direccion[1];
	//
	// var dlat = enRadianes(lat2 - lat);
	// var dlong = enRadianes(long2 - long);
	//
	// var a = Math.pow(Math.sin(dlat / 2), 2)
	// + Math.cos(enRadianes(lat))
	// * Math.cos(enRadianes(lat2))
	// * Math.pow(Math.sin(dlong / 2), 2);
	// var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	//
	// var RadioTierra = 6378.0;
	// $scope.distance = Math.round(RadioTierra * c);
	// }
});
