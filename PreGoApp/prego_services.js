UsuariosService = require('./usuarios_service.js');
EncuentrosService = require('./encuentros_service.js');
ServiciosService = require('./servicios_service.js');

function PregoServices() {
    var __store = {};
    var __usuariosService = new UsuariosService(__store);
	var __encuentrosService = new EncuentrosService(__store);
	var __serviciosService = new ServiciosService(__store);

    this.setStore = function (store) {
		__store = store;
		__usuariosService.setStore(__store);
		__encuentrosService.setStore(__store);
		__serviciosService.setStore(__store);
    }

    this.rellenar = function () {
        __usuariosService.rellenar();
        __encuentrosService.rellenar();
        __serviciosService.rellenar();
    }

    this.getUsuariosService = function () {
        return __usuariosService;
    }
	
    this.getEncuentrosService = function () {
        return __encuentrosService;
    }
    
    this.getServiciosService = function () {
        return __serviciosService;
    }
}

module.exports = PregoServices;