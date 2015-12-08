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

function getCommonDatePickerOptions(){
	var rangoEstaNoche = [moment().hours(23).minutes(0).seconds(0), 								moment().add(1, 'days').hours(6).minutes(0).seconds(0)];
	var rangoSabado =	 [moment().endOf("week").hours(23).minutes(0).seconds(0), 					moment().endOf("week").add(1, 'days').hours(6).minutes(0).seconds(0) ];
	var rangoViernes = 	[moment().endOf("week").add(-1, 'days').hours(23).minutes(0).seconds(0), 	moment().endOf("week").hours(6).minutes(0).seconds(0) ];
 
	   
	return {
		"autoUpdateInput": false,
		"timePicker": true,
		"timePicker24Hour": true,
		"timePickerIncrement": 60,
		"autoApply": true,
		"dateLimit": {
			"days": 4
		},
		
		"ranges": {
			"Esta noche": rangoEstaNoche,
			"Viernes a la noche": rangoViernes,
			"Sábado a la noche": rangoSabado
		},
		"locale": {
			"format": "DD/MM/YYYY h:mm A",
			"separator": " - ",
			"applyLabel": "Aplicar",
			"cancelLabel": "Cancelar",
			"fromLabel": "Desde",
			"toLabel": "Hasta",
			"customRangeLabel": "Personalizado",
			"daysOfWeek": [
				"Do",
				"Lu",
				"Ma",
				"Mi",
				"Ju",
				"Vi",
				"Sa"					
			],
			"monthNames": [
				"Enero",
				"Febrero",
				"Marzo",
				"Abril",
				"Mayo",
				"Junio",
				"Julio",
				"Augosto",
				"Septiembre",
				"Octubre",
				"Noviembre",
				"Diciembre"
			],
			"firstDay": 0
		},
		"opens": "center",
		"drops": "down"
	};	
}
