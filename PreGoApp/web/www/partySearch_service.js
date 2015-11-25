app.factory('partySearchService', function ($http, $q) {
    return {

        getPromotedPartys: function () {
	   // console.log("service getting common partys");
            return simpleHttpGet($http, '/api/promotedPartys', $q.reject);
        },

        getCommonPartys: function () {
	   // console.log("service getting promoted partys");
            return simpleHttpGet($http, '/api/commonPartys', $q.reject);
        },
    };
});
