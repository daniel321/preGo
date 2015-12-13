app.controller('partyDetailController', function ($scope, $http, $routeParams, PartyDetailService) {
    var partyKey = $routeParams.partyKey;

    $scope.party = null;
    $scope.partyTypes = [];
    $scope.selectedItems = [];

    $scope.musicGenres = [];
    $scope.selectedMusicGenres = [];

    $scope.location = {
        name: null,
        lat: null,
        lng: null
    };

    $scope.clear = function () {
        $scope.location = {
            name: null,
            lat: null,
            lng: null
        };
    };

    $scope.datePicker = {
        date: { startDate: null, endDate: null },
        options: getCommonDatePickerOptions()
    };

    function calcularCuando(desdeIsoStr)
    {
        var cuando = "";
        //var now = new Date(Date.now());
        //$scope.fechaHoraActual = Date.UTC(now.getUTCFullYear(),now.getUTCMonth(), now.getUTCDate() , now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());;
        var fechaHoraActual = new Date(Date.now());
        var fechaHoraDesde = new Date(Date.parse(desdeIsoStr));

        var diff = (fechaHoraDesde - fechaHoraActual)
        var minutos = diff / 1000 / 60;
        var horas = minutos / 60;
        var dias = horas / 24;

        if (diff > 0) {
            cuando = "En ";
        }
        else {
            cuando = "Hace ";
        }

        if (Math.abs(minutos) < 1) {
            cuando = "Ahora.";
        }
        if (horas < 1) {
            cuando += Math.floor(Math.abs(minutos)) + " minuto(s)";
        }
        else if (dias < 1) {
            cuando += Math.floor(Math.abs(horas)) + " hora(s)";
        }
        else {
            cuando += Math.floor(Math.abs(dias)) + " día(s)";
        }
        return cuando;
    }
    var getPartyTypesFinished = false;
    var getMusicGenresFinished = false;
    var getPartyFinished = false;
    function joinCallback() {
        if (getPartyTypesFinished && getMusicGenresFinished && getPartyFinished) {
            if ($scope.party.types) {
                $scope.selectedItems = getTypes($scope.party.types, $scope.partyTypes);
            }
            if ($scope.party.generos) {
                $scope.selectedMusicGenres = getTypes($scope.party.generos, $scope.musicGenres);
            }
            $scope.cuando = calcularCuando($scope.party.fechaHoraDesde);

        }
    }

    getPartyTypes(joinCallback);
    getMusicGenres(joinCallback);
    getParty(joinCallback);

    function getParty(callback) {
        PartyDetailService.getParty(partyKey)
            .then(function (response) {
                $scope.party = response.data;
                //TODO: En la página de búsqueda de fiestas se usa un objeto con estructura diferente al que se usa en partyCreate. Unificar.
                // Correcciones de compatibilidad del objeto::
                if (!$scope.party.fechaHoraDesde) {
                    $scope.party.fechaHoraDesde = $scope.party.inicio
                }
                if (!$scope.party.fechaHoraHasta) {
                    $scope.party.fechaHoraHasta = $scope.party.fin
                }
                if (!$scope.party.location) {
                    $scope.party.location = $scope.party.pos
                }
                getPartyFinished = true;
                callback();

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function getPartyTypes(callback) {
        PartyDetailService.getPartyTypes()
            .then(function (response) {
                $scope.partyTypes = response.data;
                getPartyTypesFinished = true;
                callback();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function getMusicGenres(callback) {
        PartyDetailService.getMusicGenres()
            .then(function (response) {
                $scope.musicGenres = response.data;
                getMusicGenresFinished = true;
                callback();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function getType(typeCode, fullArray) {
        for (var i = 0; i < fullArray.length; i++) {
            var partyType = fullArray[i];
            if (partyType.code == typeCode) {
                return partyType;
            }
        }
        return { code: typeCode, text: typeCode };
    }

    function getTypes(typeCodes, fullArray) {
        var result = []
        for (var i = 0; i < typeCodes.length; i++) {
            result.push(getType(typeCodes[i], fullArray));
        }
        return result;
    }

    //$scope.sendForm = function(){
    //	var party = {};
    //	party.name = $scope.name;
    //	party.description = $scope.description;
    //	party.from = $scope.datePicker.date.startDate;
    //	party.to = $scope.datePicker.date.endDate;
    //	party.location = $scope.location;

    //	party.types = $scope.getTypeCodes($scope.selectedItems);
    //	party.musicGenres = $scope.getTypeCodes($scope.selectedMusicGenres);	



    //	PartyDetailService.createParty(party).then(function(response) {
    //        console.log(response);
    //    });
    //}
});
