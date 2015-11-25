function simpleHttpGet($http, serviceUrl, rejectHandler, mockUrl, isMocked) {
    if (typeof (mockUrl) === 'undefined' || typeof (isMocked) === 'undefined') {
        isMocked = false;
    }

    var url = serviceUrl;
    if (isMocked) {
        url = mockUrl;
    }

    return $http({
        url: url,
        method: 'GET'
    }).then(function (response) {
        return response.data;
        /*if (typeof response.data === 'object') {
            return response.data;
        } else {
            // invalid response
            return rejectHandler(response);
        }*/
    }, function (response) {
        // something went wrong
        return rejectHandler(response);
    });
}