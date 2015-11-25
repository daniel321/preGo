app.factory('partySearchService', function ($http, $q) {
    return {

        getPromotedPartys: function () {
	    console.log("service getting common partys");
            return simpleHttpGet($http, '/api/promotedPartys', $q.reject);
        },

        getCommonPartys: function () {
	    console.log("service getting promoted partys");
            return simpleHttpGet($http, '/api/commonPartys', $q.reject);
        },

        getPromotedPartysToday: function () {
	    console.log("service getting common partys from Today");
            return simpleHttpGet($http, '/api/promotedPartysToday', $q.reject);
        },

        getCommonPartysToday: function () {
	    console.log("service getting promoted partys from Today");
            return simpleHttpGet($http, '/api/commonPartysToday', $q.reject);
        },

        getPromotedPartysCloseBy: function () {
	    console.log("service getting common partys close by");
            return simpleHttpGet($http, '/api/promotedPartysCloseBy', $q.reject);
        },

        getCommonPartysCloseBy: function () {
	    console.log("service getting promoted partys close by");
            return simpleHttpGet($http, '/api/commonPartysCloseBy', $q.reject);
        }

    };
});
