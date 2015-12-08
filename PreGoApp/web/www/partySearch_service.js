app.factory('partySearchService', function ($http, $q) {
    return {

        getPromotedPartys: function (lat,long,types) {
	   // console.log("service getting common partys");
            return simpleHttpGet($http, '/api/promotedPartys?lat='+lat+'&long='+long+'&types='+types, $q.reject);
        },

        getCommonPartys: function (lat,long,types) {
	   // console.log("service getting promoted partys");
            return simpleHttpGet($http, '/api/commonPartys?lat='+lat+'&long='+long+'&types='+types, $q.reject);
        },

        getPromotedPartysToday: function (lat,long,day,month,year) {
	   // console.log("service getting common partys");
            return simpleHttpGet($http, '/api/promotedPartysToday?lat='+lat+'&long='+long+'&day='+day+'&month='+month+'&year='+year, $q.reject);
        },

        getCommonPartysToday: function (lat,long,day,month,year) {
	   // console.log("service getting promoted partys");
            return simpleHttpGet($http, '/api/commonPartysToday?lat='+lat+'&long='+long+'&day='+day+'&month='+month+'&year='+year, $q.reject);
        },

        getPromotedPartysCloseBy: function (lat,long,tol) {
	   // console.log("service getting common partys");
            return simpleHttpGet($http, '/api/promotedPartysCloseBy?lat='+lat+'&long='+long+"&tol="+tol, $q.reject);
        },

        getCommonPartysCloseBy: function (lat,long,tol) {
	   // console.log("service getting promoted partys");
            return simpleHttpGet($http, '/api/commonPartysCloseBy?lat='+lat+'&long='+long+"&tol="+tol, $q.reject);
        },

	getPartyTypes: function () {
		return $http({url: '/api/partyTypes',method: 'GET'});
        },

    };
});
